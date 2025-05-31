import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOTPEmail(email: string, otp: string, action: string) {
  const isVerification = action === 'verify email';
  const subject = isVerification 
    ? 'Your Email Verification Code' 
    : 'Password Reset Request';
  
  const title = isVerification
    ? 'Verify Your Email Address'
    : 'Reset Your Password';
  
  const description = isVerification
    ? 'Please use the following verification code to complete your email verification:'
    : 'Please use the following code to reset your password:';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #4f46e5;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
          background-color: #f9fafb;
        }
        .otp-container {
          margin: 25px 0;
          text-align: center;
        }
        .otp-code {
          display: inline-block;
          padding: 15px 25px;
          background-color: #ffffff;
          color: #4f46e5;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 2px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          background-color: #f3f4f6;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4f46e5;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin-top: 20px;
        }
        .note {
          font-size: 14px;
          color: #6b7280;
          margin-top: 30px;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        
        <div class="content">
          <p>Hello,</p>
          <p>${description}</p>
          
          <div class="otp-container">
            <div class="otp-code">${otp}</div>
          </div>
          
          <p>This code will expire in 5 minutes. Please don't share this code with anyone.</p>
          
          ${isVerification ? `
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          ` : `
          <p>If you didn't request a password reset, please secure your account immediately.</p>
          `}
          
          <div class="note">
            <p>Need help? Contact our support team at <a href="mailto:${process.env.COMPANY_EMAIL}">${process.env.COMPANY_EMAIL}</a></p>
          </div>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
          <p> ${process.env.COMPANY_ADDRESS} </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await this.transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    text: `${title}\n\n${description}\n\nYour code: ${otp}\n\nThis code will expire in 5 minutes.`,
    html,
  });
}
}






// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   async sendOTPEmail(to: string, otp: string, actionType: string) {
//     const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         .email-container {
//           font-family: Arial, sans-serif;
//           color: #333;
//           background-color: #f9f9f9;
//           padding: 20px;
//           max-width: 600px;
//           margin: auto;
//           border-radius: 10px;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//         }
//         .logo {
//           text-align: center;
//           margin-bottom: 20px;
//         }
//         .logo img {
//           max-width: 150px;
//         }
//         .content {
//           text-align: center;
//           line-height: 1.6;
//         }
//         .otp-code {
//           display: inline-block;
//           margin: 20px auto;
//           padding: 10px 20px;
//           color: #007BFF;
//           background-color: #e9f5ff;
//           font-size: 24px;
//           font-weight: bold;
//           border-radius: 5px;
//           border: 1px solid #007BFF;
//         }
//         .copy-button {
//           margin-top: 20px;
//           padding: 10px 20px;
//           color: #fff;
//           background-color: #007BFF;
//           font-size: 16px;
//           border-radius: 5px;
//           border: none;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .footer {
//           text-align: center;
//           margin-top: 20px;
//           font-size: 12px;
//           color: #888;
//         }
//       </style>
//     </head>
//     <body>
//   <div class="email-container">
//     <div class="content">
//       <h2>Your OTP Code</h2>
//       <p>We received a request to ${actionType}. Use the OTP code below to proceed:</p>
//       <div>
//         <div class="otp-code">${otp}</div>
//       </div>
//       <p>This OTP code is valid for 5 minutes.</p>
//       <p>If you did not request this, please ignore this email.</p>
//     </div>
//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
//     </div>
//   </div>
// </body>
//     </html>
//     `;

//     await this.transporter.sendMail({
//       from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: actionType,
//       html: htmlContent,
//     });
//   }
//   async sendLetters(to: string, title: string, message: string) {
//     const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     .email-container {
//       font-family: Arial, sans-serif;
//       color: #333;
//       background-color: #f9f9f9;
//       padding: 20px;
//       max-width: 600px;
//       margin: auto;
//       border-radius: 10px;
//       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//     }
//     .logo {
//       text-align: center;
//       margin-bottom: 20px;
//     }
//     .logo img {
//       max-width: 150px;
//     }
//     .content {
//       text-align: center;
//       line-height: 1.6;
//     }
//     .title {
//       font-size: 28px;
//       color: #007BFF;
//       margin-bottom: 10px;
//     }
//     .message {
//       font-size: 18px;
//       margin: 20px 0;
//     }
//     .username {
//       font-weight: bold;
//       margin-top: 20px;
//     }
//     .footer {
//       text-align: center;
//       margin-top: 20px;
//       font-size: 12px;
//       color: #888;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//     <div class="content">
//       <h2 class="title">${title}</h2>
//       <p class="message">${message}</p>
//       <p class="username">Sent to: ${to}</p>
//     </div>
//     <div class="footer">
//       <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
//     </div>
//   </div>
// </body>
// </html>
// `;

//     await this.transporter.sendMail({
//       from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: title,
//       html: htmlContent,
//     });
//   }
// }

