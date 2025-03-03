import { useRef, useState } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.min.css";

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  alertify.set('notifier', 'position', 'top-center');

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = {
      from: formData.get('user_email'), // Email from the user
      to: 'aouladamarsamir@gmail.com', // Replace with your email
      subject: formData.get('subject'), // Subject
      text: formData.get('message'), // Message body
    };

    try {
      const response = await axios.post(
        'https://api.resend.com/emails',
        data,
        {
          headers: {
            'Authorization': `Bearer re_a1CKEfNt_ZzTMxCZ9k6gaGLTY5AALvHBw`, // Your API key
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alertify.success("Message sent successfully!");
        form.current.reset();
        setSent(true);
      } else {
        alertify.error("Failed to send message. Try again!");
      }
    } catch (error) {
      console.error(error);
      alertify.error("Failed to send message. Try again!");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-white text-center mb-4">CONTACT</h1>
      <p className="text-white text-center lg:text-xl text-xl max-w-xl mx-auto leading-relaxed">
        Ready to bring your ideas to life? Whether it's a new project or enhancing an existing one,
        I'm here to help you achieve your development goals with creativity and precision.
        Don’t hesitate—reach out today, and let’s build something extraordinary together!
      </p>

      <div className="flex justify-around justify-center mt-8">
        <div>
          <h1 className="text-4xl font-bold text-white mt-8">Contact Me</h1>
          <h3 className="lg:text-2xl text-xl text-white mt-4"><span className="text-blue-500">📍</span> Tangier-Morocco</h3>
          <h3 className="lg:text-2xl text-xl text-white mt-4"><span className="text-blue-500">✉️</span> aouladamarsamir@gmail.com</h3>
          <h3 className="lg:text-2xl text-xl text-white mt-4"><span className="text-blue-500">📞</span> +212 718087106</h3>
        </div>
        <div>
          {sent ? (
            <div className="lg:top-10 lg:flex absolute lg:justify-center lg:relative lg:ml-16">
              <p className="text-green-500 absolute">Message Sent Successfully!</p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="max-w-sm mx-auto lg:block">
              <div className="mb-5">
                <input
                  type="text"
                  name="user_name"
                  className="caret-blue-500 lg:block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="user_email"
                  className="caret-blue-500 lg:block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="subject"
                  className="bg-gray-50 lg:block caret-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Subject"
                  required
                />
              </div>
              <div className="mb-5">
                <textarea
                  name="message"
                  rows="4"
                  className="caret-blue-500 block lg:block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Message"
                />
              </div>
              <button
                type="submit"
                className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
