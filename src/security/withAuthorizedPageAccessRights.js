import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import mongodbClient from "../node/mongodb-client";


const withAuthorizedPageAccessRights = (config,requiredAccess) => {
    return  withPageAuthRequired({
        async getServerSideProps(ctx) {
            // access the user session
            const session = getSession(ctx.req, ctx.res);

            // console.log(session.user);

            let redirectNextJsPath = {};
            if (!session.user.email_verified){
                redirectNextJsPath = { redirect: { destination: '/not-verified', permanent: false }}
            }

            const userEmail = session.user.email;

            try {
                await mongodbClient.connect();
                const db = mongodbClient.db("vaani");
                const collection = db.collection("members");
                const user = await collection.findOne({email: userEmail});

                // console.log(user);

                if (!user){
                    redirectNextJsPath = { redirect: { destination: '/403', permanent: false }};

                }
                if(user?.level > requiredAccess || (user?.level === 1 && !!user?.org)){
                    redirectNextJsPath = { redirect: { destination: '/403', permanent: false }};
                }


            }
            catch (e) {
                console.log(e);
                redirectNextJsPath = { redirect: { destination: '/500', permanent: false }};

            }

            const resp = await config?.getServerSideProps?.(ctx) || {};
            return {
                ...resp,
                ...redirectNextJsPath,
            }
        },
        returnTo: config?.returnTo
    });
}

export default withAuthorizedPageAccessRights;
