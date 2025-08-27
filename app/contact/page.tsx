export default function Contact() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        Have questions or feedback about Zebra Board? We'd love to hear from
        you!
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p>Email: contact@zebraboard.com</p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/your-username/zebra-board"
            className="text-blue-500"
          >
            github.com/your-username/zebra-board
          </a>
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
        <p>Stay updated with the latest features and improvements.</p>
      </div>
    </div>
  );
}
