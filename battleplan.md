# PORTFOLIO WEBSITE

**Project:** My personal website where visitors can get to know me and my skills.

---

## 💡 Idea 💡

A personal portfolio website to showcase my work, skills, and professional background. The website will include sections for **About Me**, **Projects**, **Skills**, **Quiz**, and **Contact**, with a clean, modern design using Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

---

## 📌 Project Setup Plan

### **Phase 1: Project Setup**

1. **Create Next.js Project**

- Command: `npx create-next-app@latest portfolio-dewi --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- Navigate to project: `cd portfolio-dewi`
- Start dev server: `npm run dev`

2. **Install shadcn/ui**

- Initialize: `npx shadcn-ui@latest init`
- Add components: `npx shadcn-ui@latest add button card input label textarea navigation-menu progress alert`

3. **Install Lucide React Icons**

- Command: `npm install lucide-react`

4. **Create Folder Structure**

```bash
 portfolio-dewi/
 ├── app/
 │   ├── layout.tsx          # Main layout
 │   ├── page.tsx            # Home page
 │   ├── about/
 │   │   └── page.tsx        # About Me page
 │   ├── projects/
 │   │   └── page.tsx        # Projects page
 │   ├── skills/
 │   │   └── page.tsx        # Skills page
 │   ├── quiz/
 │   │   └── page.tsx        # Quiz page
 │   └── contact/
 │       └── page.tsx        # Contact page
 ├── components/
 │   ├── Navbar.tsx          # Navigation bar
 │   ├── Footer.tsx          # Footer
 │   ├── SkillMeter.tsx      # Skill meter component
 │   ├── QuizApp.tsx         # Quiz component
 │   └── ContactForm.tsx     # Contact form component
 ├── lib/
 │   └── utils.ts            # Utility functions (e.g., quiz questions)
 └── public/                # Images, etc.
```

---

## 📌 Frontend Development Plan

### **High Priority**

- Set up **main layout** (`app/layout.tsx`) with Navbar and Footer.
- Create **Navbar** and **Footer** components.
- Build **Home page** (`app/page.tsx`) with welcome message and overview.
- Build **About Me page** (`app/about/page.tsx`).
- Build **Projects page** (`app/projects/page.tsx`).
- Build **Skills page** (`app/skills/page.tsx`) with `SkillMeter.tsx`.
- Build **Quiz page** (`app/quiz/page.tsx`) with `QuizApp.tsx`.
- Build **Contact page** (`app/contact/page.tsx`) with `ContactForm.tsx`.

### **Medium Priority**

- Add **styling** and **responsiveness** to all pages.
- Implement **interactive elements** (e.g., buttons, hover effects).
- Add **icons** (using Lucide React) to enhance UI.

### **Low Priority**

- Add **animations** (e.g., Three.js for dynamic visuals).
- Optimize **performance** and **SEO**.

---

## 📂 Portfolio Website Structure

### 1. Homepage

**Purpose:** Serve as the landing page to welcome visitors and provide a high-level overview of the portfolio.

- **Welcome Message:**
  - A warm, personal greeting (e.g., "Hello, I'm Dewi Louhenapessy").
  - A brief, engaging tagline (e.g., "Full-Stack Developer Passionate about Building Digital Experiences").
- **Introduction:**
  - A concise paragraph (2-3 sentences) explaining the purpose of the site:
    - Mention that this is a **portfolio website** to showcase your work, skills, and professional background.
    - Highlight your expertise (e.g., frontend, backend, testing) and technologies you specialize in (React, Vue.js, Next.js, PHP, etc.).
    - Include a call-to-action (e.g., "Explore my projects and skills below!").
- **Overview of Sections:**
  - A visually distinct section (e.g., cards or a list) summarizing the main parts of the website:
    - **About Me:** "Learn more about my background, experience, and passions."
    - **Projects:** "Discover the projects I’ve worked on, with links to live demos and GitHub repositories."
    - **Skills:** "A detailed breakdown of my technical skills and proficiencies."
    - **Quiz:** "Test your knowledge with an interactive quiz I built!"
    - **Contact:** "Get in touch with me for collaborations or questions."
  - Use icons or minimal visuals to make it engaging.
- **Visual Element (Optional):**
  - A placeholder for a future **Three.js animation** (e.g., a rotating 3D text or abstract shapes) to add a dynamic touch.

---

### 2. About Me

**Purpose:** Provide visitors with a deeper understanding of your professional journey, skills, and personality.

- **Personal Introduction:**
  - A brief bio (e.g., "I'm a passionate developer with a background in [your field].").
  - Your **education**, **work experience**, and **key achievements**.
- **Skills Highlight:**
  - A summary of your top skills (e.g., "Proficient in JavaScript, TypeScript, Next.js, and Tailwind CSS").
- **Personal Interests:**
  - Hobbies or interests outside of work (e.g., "I love hiking, reading, and contributing to open-source projects.").
- **Call-to-Action:**
  - Encourage visitors to explore further (e.g., "Check out my projects to see what I’ve built!").

---

### 3. Projects

**Purpose:** Showcase your work and provide examples of your skills in action.

- **Project List:**
  - Each project should include:
    - **Title** (e.g., "E-commerce Website").
    - **Description** (1-2 sentences explaining the project’s purpose and your role).
    - **Technologies Used** (e.g., Next.js, Tailwind CSS, Firebase).
    - **Links:**
      - Live demo (if available).
      - GitHub repository.
    - **Visuals:** Screenshots or GIFs of the project.
- **Call-to-Action:**
  - Encourage visitors to explore your code or try the live demo (e.g., "Feel free to check out the code or try it yourself!").

---

### 4. Skills

**Purpose:** Highlight your technical proficiencies and areas of expertise.

- **Skills Overview:**
  - A list of your skills, categorized by type (e.g., **Frontend**, **Backend**, **Tools**).
- **Skill Meter:**
  - Use the `SkillMeter.tsx` component to visually represent your proficiency in each skill (e.g., a progress bar for JavaScript: 90%).
- **Call-to-Action:**
  - Encourage visitors to learn more about your experience (e.g., "Interested in how I’ve applied these skills? Check out my projects!").

---

### 5. Quiz

**Purpose:** Engage visitors with an interactive quiz related to your field (e.g., web development).

- **Quiz Introduction:**
  - A brief explanation of the quiz’s purpose (e.g., "Test your knowledge of web development with this fun quiz!").
- **Quiz Questions:**
  - Multiple-choice questions (e.g., "What is the capital of the Netherlands?").
  - Store questions in `lib/utils.ts`.
- **Quiz Features:**
  - **Score Tracking:** Display the user’s score at the end.
  - **Feedback:** Provide correct answers and explanations after each question.
  - **Restart Option:** Allows users to retake the quiz.
- **Example Questions:**
  - "What is the capital of the Netherlands?" (Options: Amsterdam, Rotterdam, The Hague, Utrecht).
  - "Who invented JavaScript?" (Options: Brendan Eich, Linus Torvalds, Bill Gates, Steve Jobs).
  - "Which CSS framework is known for utility-first styling?" (Options: Tailwind CSS, Bootstrap, Bulma, Materialize).
- **Call-to-Action:**
  - Encourage visitors to try the quiz and share their scores (e.g., "Challenge yourself and see how you do!").

---

### 6. Contact

**Purpose:** Provide a way for visitors to reach out for collaborations, questions, or opportunities.

- **Introduction:**
  - A friendly message (e.g., "Interested in working together or have a question? Feel free to reach out!").
- **Contact Form:**
  - Fields:
    - **Name** (text input, required).
    - **Email** (email input, required).
    - **Subject** (text input, required).
    - **Message** (textarea, required).
  - **Submit Button:** "Send Message".
  - **Success Message:** "Thank you for your message! I’ll get back to you as soon as possible."
  - **Error Handling:** Clear error messages for invalid inputs or failed submissions.
- **Automatic Response:**
  - Mention that users will receive an **automated email confirmation** upon submission (e.g., "You’ll receive a confirmation email shortly").
- **Alternative Contact Methods:**
  - **Email:** Direct email link (e.g., "[dewi@example.com](mailto:dewi@example.com)").
  - **LinkedIn:** Link to your LinkedIn profile.
  - **GitHub:** Link to your GitHub profile.
  - **Social Media:** Links to other platforms (e.g., Twitter, Instagram) if applicable.
- **Call-to-Action:**
  - Encourage visitors to connect (e.g., "Let’s build something amazing together!").

---

## 📝 Backend Considerations (Future)

- **Next.js API Routes:** For simple server-side logic (e.g., contact form submission).
- **Separate Backend:** If needed, create a `/server` folder or a separate project for Node.js/Express, Firebase, etc.
- **Database:** Consider adding a database (e.g., PostgreSQL, MongoDB) if dynamic data is required.

---

## 🔍 Questions

- How can I make the quiz more engaging?
- Should I add a blog section in the future?
- What’s the best way to handle form submissions without a backend?

---

## 💭 Notes/Thoughts

- Add things to README.md that show what you have not been able to integrate yet, but demonstrate that you have thought about it.
- Keep it simple, stick to the MVP!
- Focus on **clean code**, **responsiveness**, and **user experience**.

---

## ✅ To Do

- Complete **Phase 1: Project Setup** (Next.js, shadcn/ui, folder structure).
- Develop **main layout**, **Navbar**, and **Footer**.
- Build all **pages** (Home, About, Projects, Skills, Quiz, Contact).
- Add **styling** and **interactivity**.
- Test **responsiveness** on different devices.
- Deploy the website (e.g., Vercel, Netlify).
- Consider adding a **backend** if dynamic functionality is needed.

---

## 🎯 MVP (Minimum Viable Product)

- A **fully functional frontend** with all pages and components.
- **Responsive design** for mobile, tablet, and desktop.
- **Interactive elements** (e.g., quiz, contact form).
- **Clean, modern UI** with Tailwind CSS and shadcn/ui.
