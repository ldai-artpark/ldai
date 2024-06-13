export default function VaaniDashboard() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <style>
                    {`
                    body {
                        font-family: 'Quicksand', sans-serif;
                    }
                    .title {
                        font-family: 'Quicksand', sans-serif;
                    }

                    `}
                </style>
            </head>
            <nav className="bg-blue-100 text-white p-3 w-full flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        className="w-19 h-16 mx-4 rounded-3xl"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                        alt="Google Logo"
                    />
                    <img
                        className="w-19 h-16 mx-2 rounded-2xl"
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Indian_Institute_of_Science_2019_logo.svg/800px-Indian_Institute_of_Science_2019_logo.svg.png"
                        alt="IISc Logo"
                    />
                    <img
                        className="w-19 h-16 mx-2 rounded-3xl"
                        src= "https://static1.squarespace.com/static/656da8a33674465c6ee4de76/t/656eef5dc309a83a361c4ab4/1701769053487/ARTPARK+secondary.png?format=1500w"
                    />
                </div>
                <h1 className="text-2xl">
                    <a href="https://vaani.iisc.ac.in/" className="text-black hover:text-gray-300">
                        Vaani Dashboard
                    </a>
                </h1>
            </nav>
            <div className="w-full max-w-5xl mx-auto mt-5 text-center bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="m-3" style={{ height: '75vh', overflow: 'auto' }}>
                    <iframe
                        className="w-full h-full border border-gray-300 rounded-lg shadow-sm"
                        src="https://lookerstudio.google.com/embed/reporting/bda524a9-99d3-4bae-849c-5eff75fac985/page/ykLtD"
                        frameBorder="0"
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}