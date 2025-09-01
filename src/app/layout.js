import './globals.css';
import './styles/scroll.css'
import { Poppins, Abril_Fatface } from 'next/font/google';
import { BundleProvider } from './components/context/BundleContext';

// Load font from Google
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // choose weights you’ll use
  variable: '--font-poppins', // creates a CSS variable
})

export const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abrilFatface",
});

export const metadata = {
  title: 'InterVest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${abrilFatface.variable}`}>
      <body>
        
        <BundleProvider>{children}</BundleProvider>
      </body>
    </html>
  );
}
