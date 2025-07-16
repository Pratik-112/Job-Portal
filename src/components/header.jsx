import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {useUser} from "@clerk/clerk-react"
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {    // React component is written in Pascal case
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  function handleSignInDisplay(e) {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  }

  const {user} = useUser();

  return (
    <>
      <nav className="py-4 max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-20 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => {
                // call back function

                setShowSignIn(true);
              }}
            >
              {" "}
              Login{" "}
            </Button>
          </SignedOut>
          <SignedIn>
         {user?.unsafeMetadata?.role === "Recruiter" 
          &&
          <Link to="/post-job">
          <Button variant="destructive" className="rounded-full">
              {" "}
              <PenBox size={20}  /> Post a Job
            </Button>
          </Link>
         } 

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon=<BriefcaseBusiness size={15} />
                  href="/my-jobs"
                ></UserButton.Link>

                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon=<Heart size={15} />
                  href="/saved-jobs"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          onClick={(e) => {
            handleSignInDisplay(e);
          }}
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          <SignIn
            afterSignInUrl="/onboarding"
            afterSignUpUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
