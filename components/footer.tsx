"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          Designed & Built by{" "}
          <motion.a
            href="https://github.com/luckys-lnz/luckys-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline-offset-4 hover:underline"
            whileHover={{ scale: 1.05, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Lucky Archibong
          </motion.a>
        </p>
        <p className="text-xs text-muted-foreground select-none">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
