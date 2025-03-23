 
# 📧 Portfolio Contact Form

- to start

```bash
bun install 
bun run dev
:::or:::
npm install
npm run dev
```

- A contact form integrated into a portfolio site using React, Resend API, and Tailwind CSS. This project enables visitors to send messages directly from the contact form to your email.

---

## 🛠️ Technologies Used

- **React.js**: Frontend framework to build the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Resend API**: API used to send emails securely.
- **Vercel**: Deployment platform for easy and fast hosting.
- **Node.js**: Backend environment (if used for server-side logic).
  
---

## 🚀 Features

- Contact form with user input validation.
- Email sent to the owner’s inbox upon form submission.
- Responsive design using Tailwind CSS.
- Integrated with Resend API for email functionality.
- Deployment on Vercel for easy access.

---

## 🖥️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### 2. Install dependencies

Make sure you have **Node.js** installed on your local machine, then install the required dependencies:

```bash
cd your-repository-name
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root of the project and add your **Resend API key**:

```bash
RESEND_API_KEY=your_resend_api_key
```

> Replace `your_resend_api_key` with your actual API key from Resend.

### 4. Run the project locally

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 💻 Deployment

This project is deployed on [Vercel](https://vercel.com). Every push to the `main` branch triggers an automatic deployment.

To redeploy, simply push your changes to GitHub.

---

## 🔧 API Configuration

The email is sent using the **Resend API** when the contact form is submitted. Make sure your **RESEND_API_KEY** is properly configured in your Vercel dashboard or `.env` file for local development.

---

## 🤖 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 📫 Contact

- **Website**: [Your Portfolio](https://your-portfolio-link)
- **Email**: your-email@example.com
```
 