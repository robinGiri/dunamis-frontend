import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export default function About() {
  return (
    <>
      {/* Navbar is always rendered at the top */}
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl p-6">
          <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
          <div className="card bg-base-100 shadow-xl p-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Our Story</h2>
              <p className="text-base-content mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                nec quam sed urna consequat aliquet. Fusce in ultricies nunc.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Donec viverra, nunc ac fermentum
                consequat, nulla mi ultricies odio, eget consequat libero massa
                vel nisi.
              </p>
              <p className="text-base-content">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}
