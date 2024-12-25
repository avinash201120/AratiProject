import nodemailer from "nodemailer";

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER as string, // Ensure environment variables are strings
    pass: process.env.EMAIL_PASS as string,
  },
});

// Define the sendEmail function with explicit types
const sendEmail = async (
  to: string | string[],
  subject: string,
  html: string
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER as string, // Ensure this is a string
    to, // Accept single email or array of emails
    subject,
    html,
  });
};

export default sendEmail;

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, html) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//   });
// };

// export default sendEmail;
