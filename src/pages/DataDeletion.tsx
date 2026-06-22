import React from "react";
import { Link } from "react-router-dom";

const DataDeletion: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl mt-20">
      <h1 className="text-3xl font-bold text-primary-blue mb-8">Data Deletion Instructions</h1>

      <div className="prose prose-sm md:prose-base max-w-none whitespace-pre-line text-gray-700">
        <p>
          At <strong>Vacanza</strong>, we take your privacy seriously. If you wish to delete your account and all associated personal data from our platform, you can request data deletion by following the instructions below.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-blue">Request Deletion via Email</h2>
        <p>
          To ensure the security of your account and verify your identity, we process data deletion requests via email. Please follow these steps:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Send an email to <strong>info@vacanzagreece.gr</strong> from the email address that is associated with your Vacanza account.</li>
          <li>Use the subject line: <strong>Account Data Deletion Request</strong>.</li>
          <li>In the body of the email, please state that you wish to permanently delete your account and personal data.</li>
          <li>If you signed up via Facebook, please mention that you are requesting the deletion of data associated with your Facebook login.</li>
        </ul>
        <p className="mt-4">
          Our support team will process your request and confirm the deletion within 30 days, in compliance with GDPR and App Store requirements.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-primary-blue">What Happens When Your Data is Deleted?</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Your user profile, home listing, and photos will be permanently removed from public view.</li>
          <li>All your exchange requests, messages, and personal information will be anonymized or deleted.</li>
          <li>Your active memberships will be canceled immediately without refund.</li>
          <li>Any data required to be kept for legal, tax, or security purposes may be retained for the minimum period required by law, after which it will be securely deleted.</li>
        </ul>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p>
            For more information on how we handle your data, please read our{" "}
            <Link to="/privacy-policy" className="text-[#3174CD] hover:underline font-medium">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
