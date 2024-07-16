# Vaani Homepage Project

This project is the homepage for the Vaani project. Below you will find instructions to set up the project and details about the main entry point of the application.

## Project Setup

To set up the project, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/NewronAI/ldai.git
    cd ldai
    ```

2. **Install dependencies:**
    ```sh
    yarn install
    ```

3. **Run the development server:**
    ```sh
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Main Entry Point

The main entry point of this project is the `index.js` file located in the `pages` directory.

### Overview of components used in `index.js`

- **Header:** Displays the header of the webpage.
- **Hero:** The main hero section of the homepage.
- **Stats:** Shows various statistics fetched from the API.
- **ExploreData:** Allows users to explore data visually using the indian map.
- **DownloadSection:** Section where user is redirected to data hosting platform.
- **Team:** Information about the team behind the project.
- **ArticlesSection:** Displays articles or posts.
- **Faqs:** Frequently Asked Questions section.
- **Footer:** The footer of the webpage.

### Data Fetching

The `getStaticProps` function handles data fetching from an external API endpoint and prepares it to be passed as props to the `Home` component.

### Revalidation

The `getStaticProps` function revalidates the data every 600 seconds (10 minutes) to ensure the homepage displays up-to-date information.

---

Follow the instructions above to set up and understand the structure of the Vaani homepage project.


## Contributing

We welcome contributions to improve the code and functionality of this project. Here are some ways you can contribute:

### Fork the Repository
- Click the "Fork" button at the top right of this page to create a copy of this repository in your GitHub account.

### Clone the Repository
- Clone your forked repository to your local machine:

```sh
git clone https://github.com/yourusername/climate-models.git

```

### Create a New Branch
- Create a new branch for your feature or bugfix:

```sh
git checkout -b feature-name
```

### Make Your Changes

- Make your changes to the code.

### Commit Your Changes

- Commit your changes with a meaningful commit message:

```sh
git commit -m "Add feature-name"
```

### Push to Your Branch
- Push your changes to your forked repository:
```sh
git push origin feature-name

```

### Create a Pull Request
- Create a pull request to the main repository with a description of your changes.

### Code Style
- Follow PEP8 guidelines for Python code.
- Use meaningful variable and function names.
- Add comments and docstrings to your code for better readability.


Thank you for your contributions!
