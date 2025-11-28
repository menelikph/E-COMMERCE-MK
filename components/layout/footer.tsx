import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid ml-20 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/menelik_logo.png"
              alt="Logo Menelik"
              width={200}
              height={40}
              className=""
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-purple-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-muted-foreground hover:text-purple-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            {/*<LanguageSwitcher /> */}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Menelik Puerta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}