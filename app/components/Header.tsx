"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "@/app/AcmeLogo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import SearchBar from "./Searchbar";

export default function Header() {
  const [user, setUser] = useState<{ name: string | null }>({ name: null });
  const router = useRouter();

  // Decode JWT token and extract username
  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.authToken; // Retrieve the auth token from cookies

    if (authToken) {
      try {
        const decodedToken: { username: string } = jwtDecode(authToken); // Decode the token
        setUser({ name: decodedToken.username }); // Set the username from the token
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser({ name: null });
      }
    } else {
      setUser({ name: null }); // Handle case where token is missing
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    destroyCookie(null, "authToken", { path: "/" }); // Remove auth token
    setUser({ name: null });
    router.push("/authentication/login"); // Redirect to login
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add your search logic here (e.g., API call)
  };

  return (
    <Navbar className="bg-green-200">
      <NavbarBrand>
        <AcmeLogo />
        <p>ViaProxy</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <SearchBar
          placeholder="Search For Products ?"
          onSearch={handleSearch}
        />
        <NavbarItem>
          <Link color="foreground" href="#">
            {/* Features */}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            {/* Customers */}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            {/* Integrations */}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user.name ? (
          <>
            <NavbarItem>
              <p className="mr-4 text-gray-700">Welcome, {user.name}!</p>
            </NavbarItem>
            <NavbarItem>
              <Button color="warning" onClick={handleLogout} variant="flat">
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            {/* Removed 'hidden' for Login button */}
            <NavbarItem>
              {/* <Link href="/authentication/login">Login</Link> */}
              <Link href="/authentication/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
              {/* <Button
                as={Link}
                color="primary"
                // href="/authentication/register"
                href="/authentication/newregistration"
                variant="flat"
              >
                Register
              </Button> */}
              {/* <Link href="/authentication/newregistration">Register</Link> */}
              {/* <Link href="/authentication/register">Register</Link> */}
              <Link href="/authentication/signup">signup</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

// "use client";

// import {
//   Button,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
// } from "@nextui-org/react";
// import { AcmeLogo } from "@/app/AcmeLogo";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { parseCookies, destroyCookie } from "nookies";
// import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

// export default function Header() {
//   const [user, setUser] = useState<{ name: string | null }>({ name: null });
//   const router = useRouter();

//   // Decode JWT token and extract username
//   useEffect(() => {
//     const cookies = parseCookies();
//     const authToken = cookies.authToken; // Retrieve the auth token from cookies

//     if (authToken) {
//       try {
//         const decodedToken: { username: string } = jwtDecode(authToken); // Decode the token
//         setUser({ name: decodedToken.username }); // Set the username from the token
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         setUser({ name: null });
//       }
//     } else {
//       setUser({ name: null }); // Handle case where token is missing
//     }
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     destroyCookie(null, "authToken", { path: "/" }); // Remove auth token
//     setUser({ name: null });
//     router.push("/authentication/login"); // Redirect to login
//   };

//   return (
//     <Navbar className="bg-green-300">
//       <NavbarBrand>
//         <AcmeLogo />
//         <p>ViaProxy</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Features
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="#" aria-current="page">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         {user.name ? (
//           <>
//             <NavbarItem>
//               <p className="mr-4 text-gray-700">Welcome, {user.name}!</p>
//             </NavbarItem>
//             <NavbarItem>
//               <Button color="warning" onClick={handleLogout} variant="flat">
//                 Logout
//               </Button>
//             </NavbarItem>
//           </>
//         ) : (
//           <>
//             <NavbarItem className="hidden lg:flex">
//               <Link href="/authentication/login">Login</Link>
//             </NavbarItem>
//             <NavbarItem>
//               <Button
//                 as={Link}
//                 color="primary"
//                 href="/authentication/register"
//                 variant="flat"
//               >
//                 Register
//               </Button>
//             </NavbarItem>
//           </>
//         )}
//       </NavbarContent>
//     </Navbar>
//   );
// }

// "use client";

// import {
//   Button,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
// } from "@nextui-org/react";
// import { AcmeLogo } from "@/app/AcmeLogo";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { parseCookies, destroyCookie } from "nookies";

// export default function Header() {
//   const [user, setUser] = useState<{ name: string | null }>({ name: null });
//   const router = useRouter();

//   // Fetch user information from cookies on component mount
//   useEffect(() => {
//     const cookies = parseCookies();
//     const username = cookies.username; // Assuming `username` is set in cookies
//     if (username) {
//       setUser({ name: username });
//     }
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     destroyCookie(null, "authToken", { path: "/" }); // Remove auth token
//     destroyCookie(null, "username", { path: "/" }); // Remove username
//     setUser({ name: null });
//     router.push("/authentication/login"); // Redirect to login
//   };

//   return (
//     <Navbar className="bg-green-300">
//       <NavbarBrand>
//         <AcmeLogo />
//         <p>ViaProxy</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Features
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="#" aria-current="page">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         {user.name ? (
//           <>
//             <NavbarItem>
//               <p className="mr-4 text-gray-700">Welcome, {user.name}!</p>
//             </NavbarItem>
//             <NavbarItem>
//               <Button color="warning" onClick={handleLogout} variant="flat">
//                 Logout
//               </Button>
//             </NavbarItem>
//           </>
//         ) : (
//           <>
//             <NavbarItem className="hidden lg:flex">
//               <Link href="/authentication/login">Login</Link>
//             </NavbarItem>
//             <NavbarItem>
//               <Button
//                 as={Link}
//                 color="primary"
//                 href="/authentication/register"
//                 variant="flat"
//               >
//                 Register
//               </Button>
//             </NavbarItem>
//           </>
//         )}
//       </NavbarContent>
//     </Navbar>
//   );
// }

// import {
//   Button,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
// } from "@nextui-org/react";
// import { AcmeLogo } from "@/app/AcmeLogo";
// export default function Header() {
//   return (
//     <Navbar className="bg-green-300">
//       <NavbarBrand>
//         <AcmeLogo />
//         <p>ViaProxy</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Features
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link href="#" aria-current="page">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="/authentication/login">Login</Link>
//         </NavbarItem>
//         {/* <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Sign Up
//           </Button>
//         </NavbarItem> */}
//         <NavbarItem>
//           <Button
//             as={Link}
//             color="primary"
//             href="/authentication/register"
//             variant="flat"
//           >
//             Register
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }
