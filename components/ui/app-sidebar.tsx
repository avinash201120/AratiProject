import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleNavigation } from "@/lib/roleNavigation";
import { clearUser } from "@/store/slices/authSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AppSidebar() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const { role, name } = useSelector((state: any) => state.auth);
  const navigationItems = roleNavigation(role, t);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // Track expanded labels

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/authentication/logout", { method: "POST" });
      if (res.ok) {
        dispatch(clearUser());
        router.push("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // function renderNavigationItems(
  //   items: any[],
  //   isCollapsed: boolean,
  //   currentPath: string
  // ): JSX.Element {
  //   const normalizePath = (path: string | undefined) =>
  //     path?.replace(/^\/(en|fr)/, "") || ""; // Normalize dynamic language prefixes

  //   const isPathActive = (path: string | undefined) =>
  //     normalizePath(currentPath).startsWith(normalizePath(path)); // Check if currentPath starts with item path

  //   return (
  //     <ul className="space-y-2">
  //       {items.map((item) => {
  //         const isActive = isPathActive(item.path); // Determine if this item is active
  //         const isExpanded = expandedItems.includes(item.label) || isActive; // Expand if active or explicitly expanded

  //         // Log debugging information for each item
  //         console.debug("Rendering Item:", {
  //           label: item.label,
  //           path: item.path,
  //           isActive,
  //           isExpanded,
  //         });

  //         return (
  //           <li key={item.label} className="flex flex-col">
  //             <div className="flex items-center gap-2">
  //               {/* Render the current item */}
  //               {item.path ? (
  //                 <Link
  //                   href={item.path}
  //                   prefetch={false}
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isActive
  //                       ? "font-bold text-blue-600 border-l-4 border-blue-600 pl-2"
  //                       : isExpanded
  //                       ? "font-bold text-blue-500"
  //                       : "text-gray-700"
  //                   } hover:text-blue-600`}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </Link>
  //               ) : (
  //                 <div
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
  //                   } hover:text-blue-600 cursor-pointer`}
  //                   onClick={() => item.children && toggleExpand(item.label)}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </div>
  //               )}

  //               {/* Arrow for toggling children */}
  //               {item.children && (
  //                 <button
  //                   onClick={(e) => {
  //                     e.preventDefault();
  //                     toggleExpand(item.label);
  //                   }}
  //                   className="ml-auto text-gray-500 hover:text-blue-600 focus:outline-none"
  //                 >
  //                   <ChevronRight
  //                     size={15}
  //                     className={`${isExpanded ? "rotate-90" : ""} transform`}
  //                   />
  //                 </button>
  //               )}
  //             </div>

  //             {/* Render children if expanded */}
  //             {isExpanded && item.children && (
  //               <div className="ml-4">
  //                 {renderNavigationItems(
  //                   item.children,
  //                   isCollapsed,
  //                   currentPath
  //                 )}
  //               </div>
  //             )}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }

  //logout function attached on the label
  function renderNavigationItems(
    items: any[],
    isCollapsed: boolean,
    currentPath: string
  ) {
    // Normalize the current path to handle dynamic language prefix
    const normalizedCurrentPath = currentPath.replace(/^\/(en|fr)/, "");

    // console.debug("Normalized Current Path:", normalizedCurrentPath);

    return (
      <ul className="space-y-2">
        {items.map((item: any) => {
          const normalizedItemPath = item.path?.replace(/^\/(en|fr)/, "") || "";

          // Check if the item path matches the current path
          const isActive = normalizedCurrentPath === normalizedItemPath;

          const isExpanded = expandedItems.includes(item.label);
          // console.log("Rendering Item:", {
          //   label: item.label,
          //   itemPath: item.path,
          //   normalizedItemPath,
          //   isActive,
          //   appliedClassName: isActive
          //     ? "font-bold text-blue-600"
          //     : isExpanded
          //     ? "font-bold text-blue-500"
          //     : "text-gray-700",
          // });

          return (
            <li key={item.label} className="flex flex-col">
              <div className="flex items-center gap-2">
                {item.label === "Logout" ? (
                  <div
                    className={`flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer`}
                    onClick={handleLogout} // Call handleLogout on click
                  >
                    {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                ) : item.path ? (
                  <Link
                    href={item.path}
                    prefetch={false} // Avoid middleware delays by prefetching only on demand
                    className={`flex items-center gap-2 text-sm ${
                      isActive
                        ? "font-bold text-blue-600 border-l-4 border-blue-600 pl-2" // Highlight active item
                        : isExpanded
                        ? "font-bold text-blue-500"
                        : "text-gray-700"
                    } hover:text-blue-600`}
                  >
                    {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      isExpanded ? "font-bold text-blue-600" : "text-gray-700"
                    } hover:text-blue-600 cursor-pointer`}
                    onClick={() => item.children && toggleExpand(item.label)}
                  >
                    {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                )}

                {/* Arrow for toggling children */}
                {item.children && (
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent triggering navigation logic
                      toggleExpand(item.label);
                    }}
                    className="ml-auto text-gray-500 hover:text-blue-600 focus:outline-none"
                  >
                    <ChevronRight
                      size={15}
                      className={`${isExpanded ? "rotate-90" : ""} transform`}
                    />
                  </button>
                )}
              </div>

              {/* Render children if expanded */}
              {isExpanded && item.children && (
                <div className="ml-4">
                  {renderNavigationItems(
                    item.children,
                    isCollapsed,
                    currentPath
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  //logout function not  attached
  // function renderNavigationItems(
  //   items: any[],
  //   isCollapsed: boolean,
  //   currentPath: string
  // ) {
  //   // Normalize the current path to handle dynamic language prefix
  //   const normalizedCurrentPath = currentPath.replace(/^\/(en|fr)/, "");

  //   console.debug("Normalized Current Path:", normalizedCurrentPath);

  //   return (
  //     <ul className="space-y-2">
  //       {items.map((item: any) => {
  //         const normalizedItemPath = item.path?.replace(/^\/(en|fr)/, "") || "";

  //         // Check if the item path matches the current path
  //         const isActive = normalizedCurrentPath === normalizedItemPath;

  //         const isExpanded = expandedItems.includes(item.label);
  //         console.log("Rendering Item:", {
  //           label: item.label,
  //           itemPath: item.path,
  //           normalizedItemPath,
  //           isActive,
  //           appliedClassName: isActive
  //             ? "font-bold text-blue-600"
  //             : isExpanded
  //             ? "font-bold text-blue-500"
  //             : "text-gray-700",
  //         });

  //         return (
  //           <li key={item.label} className="flex flex-col">
  //             <div className="flex items-center gap-2">
  //               {/* Render the current item */}
  //               {item.path ? (
  //                 // <Link
  //                 //   href={item.path}
  //                 //   prefetch={false} // Avoid middleware delays by prefetching only on demand
  //                 //   className={`flex items-center gap-2 text-sm ${
  //                 //     isActive
  //                 //       ? "font-bold text-blue-600" // Highlight active item
  //                 //       : isExpanded
  //                 //       ? "font-bold text-blue-500"
  //                 //       : "text-gray-700"
  //                 //   } hover:text-blue-600`}
  //                 // >
  //                 //   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                 //   {!isCollapsed && (
  //                 //     <span className="truncate">{item.label}</span>
  //                 //   )}
  //                 // </Link>
  //                 <Link
  //                   href={item.path}
  //                   prefetch={false} // Avoid middleware delays by prefetching only on demand
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isActive
  //                       ? "font-bold text-blue-600 border-l-4 border-blue-600 pl-2" // Highlight active item
  //                       : isExpanded
  //                       ? "font-bold text-blue-500"
  //                       : "text-gray-700"
  //                   } hover:text-blue-600`}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </Link>
  //               ) : (
  //                 <div
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
  //                   } hover:text-blue-600 cursor-pointer`}
  //                   onClick={() => item.children && toggleExpand(item.label)}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </div>
  //               )}

  //               {/* Arrow for toggling children */}
  //               {item.children && (
  //                 <button
  //                   onClick={(e) => {
  //                     e.preventDefault(); // Prevent triggering navigation logic
  //                     toggleExpand(item.label);
  //                   }}
  //                   className="ml-auto text-gray-500 hover:text-blue-600 focus:outline-none"
  //                 >
  //                   <ChevronRight
  //                     size={15}
  //                     className={`${isExpanded ? "rotate-90" : ""} transform`}
  //                   />
  //                 </button>
  //               )}
  //             </div>

  //             {/* Render children if expanded */}
  //             {isExpanded && item.children && (
  //               <div className="ml-4">
  //                 {renderNavigationItems(
  //                   item.children,
  //                   isCollapsed,
  //                   currentPath
  //                 )}
  //               </div>
  //             )}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }

  // og
  // function renderNavigationItems(items: any[], isCollapsed: boolean) {
  //   return (
  //     <ul className="space-y-2">
  //       {items.map((item: any) => {
  //         const isExpanded = expandedItems.includes(item.label);
  //         return (
  //           <li key={item.label} className="flex flex-col">
  //             <div className="flex items-center gap-2">
  //               {/* Render the current item */}
  //               {item.path ? (
  //                 <Link
  //                   href={item.path}
  //                   prefetch={false} // Avoid middleware delays by prefetching only on demand
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
  //                   } hover:text-blue-600`}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </Link>
  //               ) : (
  //                 <div
  //                   className={`flex items-center gap-2 text-sm ${
  //                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
  //                   } hover:text-blue-600 cursor-pointer`}
  //                   onClick={() => item.children && toggleExpand(item.label)}
  //                 >
  //                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
  //                   {!isCollapsed && (
  //                     <span className="truncate">{item.label}</span>
  //                   )}
  //                 </div>
  //               )}

  //               {/* Arrow for toggling children */}
  //               {item.children && (
  //                 <button
  //                   onClick={(e) => {
  //                     e.preventDefault(); // Prevent triggering navigation logic
  //                     toggleExpand(item.label);
  //                   }}
  //                   className="ml-auto text-gray-500 hover:text-blue-600 focus:outline-none"
  //                 >
  //                   <ChevronRight
  //                     size={15}
  //                     className={`${isExpanded ? "rotate-90" : ""} transform`}
  //                   />
  //                 </button>
  //               )}
  //             </div>

  //             {/* Render children if expanded */}
  //             {isExpanded && item.children && (
  //               <div className="ml-4">
  //                 {renderNavigationItems(item.children, isCollapsed)}
  //               </div>
  //             )}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }

  return (
    <Sidebar
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <SidebarHeader className="relative">
        <SidebarGroupLabel className="flex flex-row justify-evenly m-5">
          <span>
            <Image
              src="/ViaProxyLogo.svg"
              layout="responsive"
              height={20}
              width={20}
              alt="viaproxylogo"
            />
          </span>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <span className="flex flex-row justify-evenly">
          {/* <div>
            <Image
              src="/christian.jpg"
              width={60}
              height={60}
              alt="User Avatar"
              className="rounded-full border-2 border-gray-300 hover:border-blue-500"
            />
          </div> */}
          <div>welcome {name}</div>
        </span>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems &&
                // renderNavigationItems(navigationItems, isCollapsed)}
                renderNavigationItems(
                  navigationItems,
                  isCollapsed,
                  window.location.pathname
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="relative">
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="relative focus:outline-none"
          >
            <Image
              src="/christian.jpg"
              width={75}
              height={50}
              alt="User Avatar"
              className="rounded-full border-2 border-gray-300 hover:border-blue-500"
            />
          </button>
        </div>
        {showProfileMenu && (
          <div
            className={`absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg z-10 transition-all ${
              isCollapsed ? "ml-16" : "ml-0"
            }`}
          >
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </SidebarFooter> */}
    </Sidebar>
  );
}

// function renderNavigationItems(items: any[], isCollapsed: boolean) {
//   return (
//     <ul className="space-y-2">
//       {items.map((item: any) => {
//         const isExpanded = expandedItems.includes(item.label);
//         return (
//           <li key={item.label} className="flex flex-col">
//             <div className="flex items-center gap-2">
//               {/* Render the current item */}
//               {item.path ? (
//                 <Link
//                   href={item.path}
//                   className={`flex items-center gap-2 text-sm ${
//                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
//                   } hover:text-blue-600`}
//                 >
//                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
//                   {!isCollapsed && (
//                     <span className="truncate">{item.label}</span>
//                   )}
//                 </Link>
//               ) : (
//                 <div
//                   className={`flex items-center gap-2 text-sm ${
//                     isExpanded ? "font-bold text-blue-600" : "text-gray-700"
//                   } hover:text-blue-600 cursor-pointer`}
//                   onClick={() => item.children && toggleExpand(item.label)}
//                 >
//                   {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
//                   {!isCollapsed && (
//                     <span className="truncate">{item.label}</span>
//                   )}
//                 </div>
//               )}

//               {/* Arrow for toggling children */}
//               {item.children && (
//                 <button
//                   onClick={() => toggleExpand(item.label)}
//                   className="ml-auto text-gray-500 hover:text-blue-600 focus:outline-none"
//                 >
//                   <ChevronRight
//                     size={15}
//                     className={`${isExpanded ? "rotate-90" : ""} transform`}
//                   />
//                 </button>
//               )}
//             </div>

//             {/* Render children if expanded */}
//             {isExpanded && item.children && (
//               <div className="ml-4">
//                 {renderNavigationItems(item.children, isCollapsed)}
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// function renderNavigationItems(items: any[], isCollapsed: boolean) {
//   return (
//     <ul className="space-y-2">
//       {items.map((item: any) => {
//         const isExpanded = expandedItems.includes(item.label);
//         return (
//           <li key={item.label} className="flex flex-col">
//             {/* Render the current item */}
//             <div
//               onClick={() => item.children && toggleExpand(item.label)}
//               className={`flex items-center gap-2 text-sm ${
//                 isExpanded ? "font-bold text-blue-600" : "text-gray-700"
//               } hover:text-blue-600 cursor-pointer`}
//             >
//               {item.icon && <item.icon className="w-5 h-5" />}
//               {!isCollapsed && <span>{item.label}</span>}
//               {item.children && (
//                 <span className={`ml-auto ${isExpanded ? "rotate-90" : ""}`}>
//                   <ChevronRight size={15} />
//                 </span>
//               )}
//             </div>

//             {/* Render children if expanded */}
//             {isExpanded && item.children && (
//               <div className="ml-4">
//                 {renderNavigationItems(item.children, isCollapsed)}
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

//render all its childrens
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { roleNavigation } from "@/lib/roleNavigation";
// import { clearUser } from "@/store/slices/authSlice";
// import { useTranslations } from "next-intl";
// import Link from "next/link";

// export function AppSidebar() {
//   const t = useTranslations();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { role, name } = useSelector((state: any) => state.auth);
//   const navigationItems = roleNavigation(role, t);

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/authentication/logout", { method: "POST" });
//       if (res.ok) {
//         // Clear Redux state and localStorage
//         dispatch(clearUser());

//         router.push("/");
//       } else {
//         console.error("Failed to logout");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   function renderNavigationItems(items: any[], isCollapsed: boolean) {
//     return (
//       <ul className="space-y-2">
//         {items.map((item: any) => (
//           <li key={item.label} className="flex flex-col">
//             {/* Render the current item */}
//             {item.path ? (
//               <Link
//                 href={item.path}
//                 className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
//               >
//                 {item.icon && <item.icon className="w-5 h-5" />}
//                 {!isCollapsed && <span>{item.label}</span>}
//               </Link>
//             ) : (
//               <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
//                 {item.icon && <item.icon className="w-5 h-5" />}
//                 {!isCollapsed && <span>{item.label}</span>}
//               </div>
//             )}
//             {/* Recursively render children if available */}
//             {item.children && (
//               <div className="ml-4">
//                 {renderNavigationItems(item.children, isCollapsed)}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     );
//   }
//   return (
//     <Sidebar
//       className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
//     >
//       <SidebarHeader className="relative">
//         <SidebarGroupLabel className="flex flex-row justify-evenly m-5">
//           <span>
//             <Image
//               src="/ViaproxyLogo.svg"
//               layout="responsive"
//               height={20}
//               width={20}
//               alt="viaproxylogo"
//             />
//           </span>
//         </SidebarGroupLabel>
//       </SidebarHeader>
//       <SidebarContent>
//         <span className="flex flex-row justify-evenly">
//           <div>
//             <Image
//               src="/christian.jpg"
//               width={60}
//               height={60}
//               alt="User Avatar"
//               className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//             />
//           </div>
//           <div>{name}</div>
//         </span>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems &&
//                 renderNavigationItems(navigationItems, isCollapsed)}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="relative">
//         <div className="flex items-center justify-center">
//           <button
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="relative focus:outline-none"
//           >
//             <Image
//               src="/christian.jpg"
//               width={75}
//               height={50}
//               alt="User Avatar"
//               className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//             />
//           </button>
//         </div>
//         {showProfileMenu && (
//           <div
//             className={`absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg z-10 transition-all ${
//               isCollapsed ? "ml-16" : "ml-0"
//             }`}
//           >
//             <button
//               onClick={handleLogout}
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

//og sidebar
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { roleNavigation } from "@/lib/roleNavigation";
// import { clearUser } from "@/store/slices/authSlice";
// import { useTranslations } from "next-intl";
// import Link from "next/link";

// export function AppSidebar() {
//   const t = useTranslations();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { role, name } = useSelector((state: any) => state.auth);
//   const navigationItems = roleNavigation(role, t);

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/authentication/logout", { method: "POST" });
//       if (res.ok) {
//         // Clear Redux state and localStorage
//         dispatch(clearUser());

//         router.push("/");
//       } else {
//         console.error("Failed to logout");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <Sidebar
//       className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
//     >
//       <SidebarHeader className="relative">
//         <SidebarGroupLabel className="flex flex-row justify-evenly m-5">
//           <span>
//             <Image
//               src="/ViaproxyLogo.svg"
//               layout="responsive"
//               height={20}
//               width={20}
//               alt="viaproxylogo"
//             />
//             {/* <span>{!isCollapsed && "ViaProxy"}</span> */}
//           </span>
//         </SidebarGroupLabel>
//       </SidebarHeader>
//       <SidebarContent>
//         {/* <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 m-2 text-gray-500 hover:text-blue-500 focus:outline-none"
//         >
//           {isCollapsed ? ">" : "<"}
//         </button> */}
//         <span className="flex flex-row justify-evenly">
//           <div>
//             <Image
//               src="/christian.jpg"
//               width={60}
//               height={60}
//               alt="User Avatar"
//               className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//             />
//           </div>
//           <div>{name}</div>
//         </span>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems?.map((item: any) => (
//                 <SidebarMenuItem
//                   key={item.label}
//                   className="group/menu-item relative flex flex-col justify-evenly p-2"
//                 >
//                   <SidebarMenuButton asChild>
//                     {item.path ? (
//                       <Link
//                         href={item.path}
//                         className="flex items-center gap-2"
//                       >
//                         <item.icon className="w-5 h-5" />
//                         {!isCollapsed && <span>{item.label}</span>}
//                       </Link>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <item.icon className="w-5 h-5" />
//                         {!isCollapsed && <span>{item.label}</span>}
//                       </div>
//                     )}
//                   </SidebarMenuButton>
//                   {item.children && (
//                     <div className="ml-4">
//                       <ul className="space-y-2">
//                         {item.children.map((child: any) => (
//                           <li key={child.label}>
//                             {child.path ? (
//                               <Link
//                                 href={child.path}
//                                 className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
//                               >
//                                 {child.icon && (
//                                   <child.icon className="w-4 h-4" />
//                                 )}
//                                 {!isCollapsed && <span>{child.label}</span>}
//                               </Link>
//                             ) : (
//                               <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
//                                 {child.icon && (
//                                   <child.icon className="w-4 h-4" />
//                                 )}
//                                 {!isCollapsed && <span>{child.label}</span>}
//                               </div>
//                             )}
//                             {child.children && (
//                               <ul className="ml-4 space-y-1">
//                                 {child.children.map((grandChild: any) => (
//                                   <li key={grandChild.label}>
//                                     {grandChild.path ? (
//                                       <Link
//                                         href={grandChild.path}
//                                         className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500"
//                                       >
//                                         {grandChild.icon && (
//                                           <grandChild.icon className="w-3 h-3" />
//                                         )}
//                                         {!isCollapsed && (
//                                           <span>{grandChild.label}</span>
//                                         )}
//                                       </Link>
//                                     ) : (
//                                       <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500">
//                                         {grandChild.icon && (
//                                           <grandChild.icon className="w-3 h-3" />
//                                         )}
//                                         {!isCollapsed && (
//                                           <span>{grandChild.label}</span>
//                                         )}
//                                       </div>
//                                     )}
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//           {/* <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems?.map((item: any) => (
//                 <SidebarMenuItem
//                   key={item.label}
//                   className="group/menu-item relative flex flex-col justify-evenly p-2"
//                 >
//                   <SidebarMenuButton asChild>
//                     <a href={item.path} className="flex items-center gap-2">
//                       <item.icon className="w-5 h-5" />
//                       {!isCollapsed && <span>{item.label}</span>}
//                     </a>
//                   </SidebarMenuButton>
//                   {item.children && (
//                     <div className="ml-4">
//                       <ul className="space-y-2">
//                         {item.children.map((child: any) => (
//                           <li key={child.label}>
//                             <a
//                               href={child.path}
//                               className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
//                             >
//                               {child.icon && <child.icon className="w-4 h-4" />}
//                               {!isCollapsed && <span>{child.label}</span>}
//                             </a>
//                             {child.children && (
//                               <ul className="ml-4 space-y-1">
//                                 {child.children.map((grandChild: any) => (
//                                   <li key={grandChild.label}>
//                                     <a
//                                       href={grandChild.path}
//                                       className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500"
//                                     >
//                                       {grandChild.icon && (
//                                         <grandChild.icon className="w-3 h-3" />
//                                       )}
//                                       {!isCollapsed && (
//                                         <span>{grandChild.label}</span>
//                                       )}
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent> */}
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="relative">
//         <div className="flex items-center justify-center">
//           {/* Profile Avatar */}
//           <button
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="relative focus:outline-none"
//           >
//             <Image
//               src="/christian.jpg"
//               width={75}
//               height={50}
//               alt="User Avatar"
//               className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//             />
//           </button>
//         </div>
//         {/* Profile Dropdown Menu */}
//         {showProfileMenu && (
//           <div
//             className={`absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg z-10 transition-all ${
//               isCollapsed ? "ml-16" : "ml-0"
//             }`}
//           >
//             <button
//               onClick={handleLogout}
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
