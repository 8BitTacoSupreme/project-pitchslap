-----

# Project Pitchslap

An AI-powered story and screenplay outline generator built with Next.js and Google's Gemini API.

Project Pitchslap helps writers, creators, and producers quickly develop story ideas. It provides structured outlines based on proven screenwriting methodologies, allowing for rapid ideation, iterative refinement, and feedback from different AI-powered industry personas.

  * [TRY THE ONLINE DEMO](https://projectpitchslap.com/)

-----

## Features

  * **Multiple Outline Modes:** Generate outlines using different creative frameworks:
      * **Standard:** A simple mode for Title, Logline, and Synopsis.
      * **Prompted:** Follows the classic Pixar story spine structure.
      * **Advanced:** Uses Christopher Vogler's 12-stage Hero's Journey.
      * **Random:** Generates a complete, random story idea based on a single genre prompt.
  * **Iterative Refinement:** Refine and adjust your generated outline with natural language prompts (e.g., "add a love interest").
  * **AI Persona Feedback:** Submit your final outline for feedback from three distinct AI personas: a Producer, a Market Analyst, and a Studio Reader.
  * **Reproducible Environment:** Uses **Flox** to ensure a consistent and reliable development environment for all collaborators.

-----

## Tech Stack

  * **Framework:** Next.js
  * **Language:** TypeScript
  * **AI:** Google Gemini API (`gemini-1.5-flash-latest`)
  * **Styling:** Tailwind CSS
  * **UI Components:** Built using shadcn/ui conventions.
  * **Environment Management:** Flox / Nix

-----

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### **Prerequisites**

You will need the following tools installed on your machine:

  * [Node.js](https://nodejs.org/) (managed by Flox)
  * [npm](https://www.npmjs.com/) (managed by Flox)
  * [Git](https://git-scm.com/)
  * [Flox](https://www.google.com/search?q=https://flox.dev/docs/getting-started/install-flox/)

### **Installation**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YourUsername/project-pitchslap.git
    cd project-pitchslap
    ```

2.  **Activate the Flox Environment:**
    This command reads the `flox.nix` file and provides the correct version of Node.js and npm for the project.

    ```bash
    flox activate
    ```

3.  **Install NPM Packages:**
    Inside the activated environment, install the project's JavaScript dependencies.

    ```bash
    npm install
    ```

4.  **Set Up Your Environment Variables:**
    This is a crucial step for connecting to the Gemini API.

      * Create a new file in the root of the project directory named `.env.local`.
      * Open this new file and add the following line, replacing the placeholder with your own key:
        ```
        GEMINI_API_KEY="AIzaSy...YOUR_GEMINI_API_KEY_HERE"
        ```
      * You can get your own free or paid API key from the [Google AI Studio](https://aistudio.google.com/app/apikey). **Remember to keep your `.env.local` file and your API key secret.**

5.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application running.
