import {
  Home,
  Users,
  TrendingUp,
  Gift,
  ShoppingCart,
  Bell,
  MessageCircle,
  BookOpen,
  HelpCircle,
  User,
  LucideShoppingCart,
  LogOut,
} from "lucide-react";

type Role = "admin" | "student";
export const roleNavigation = (role: Role, t: (key: string) => string) => {
  const roleNavigation = {
    admin: [
      { label: t("admin.dashboard"), path: "/dashboard/admin", icon: Home },
      {
        label: t("admin.userManagement"),
        path: "/dashboard/admin/users",
        icon: Users,
      },
      {
        label: t("admin.tradeManagement"),
        path: "/dashboard/admin/trades",
        icon: TrendingUp,
      },
      {
        label: t("admin.donationManagement"),
        path: "/dashboard/admin/donations",
        icon: Gift,
      },
      {
        label: t("admin.salesManagement"),
        path: "/dashboard/admin/sales",
        icon: ShoppingCart,
      },
      { label: t("admin.alerts"), path: "/dashboard/admin/alerts", icon: Bell },
    ],
    student: [
      {
        label: t("student.myCampusClub"),
        icon: MessageCircle,
        children: [
          {
            label: t("student.messaging"),
            path: "/dashboard/student/messages",
            icon: MessageCircle,
          },
          {
            label: t("student.campusBlog"),
            path: "/dashboard/student/blog",
            icon: BookOpen,
          },
        ],
      },
      {
        label: t("student.exchange"),
        icon: TrendingUp,
        children: [
          {
            label: t("student.howItWorks"),
            path: "/dashboard/student/howitworks",
            icon: HelpCircle,
          },
          {
            label: t("student.exchangeManagement"),
            icon: TrendingUp,
            children: [
              {
                label: t("student.findExchangeOffer"),
                path: "/dashboard/student/exchanges/find",
                icon: TrendingUp,
              },
              {
                label: t("student.submitExchangeOffer"),
                // path: "/dashboard/student/exchanges/createexchange",
                icon: TrendingUp,
                children: [
                  {
                    label: t("student.exchangeProductForProduct"),
                    path: "/dashboard/student/exchanges/productforproduct",
                    icon: TrendingUp,
                  },
                  {
                    label: t("student.exchangeProductForService"),
                    path: "/dashboard/student/exchanges/productforservice",
                    icon: TrendingUp,
                  },
                  {
                    label: t("student.exchangeServiceForService"),
                    path: "/dashboard/student/exchanges/serviceforservice",
                    icon: TrendingUp,
                  },
                  {
                    label: t("student.exchangeServiceForProduct"),
                    path: "/dashboard/student/exchanges/serviceforproduct",
                    icon: TrendingUp,
                  },
                ],
              },
              {
                label: t("student.myExchangeOffers"),
                path: "/dashboard/student/exchanges/myexchanges",
                icon: Gift,
              },
            ],
          },
          {
            label: t("student.myExchangeTransactions"),
            icon: ShoppingCart,
            children: [
              {
                label: t("student.ongoingExchanges"),
                path: "/dashboard/student/exchanges/ongoingexchanges",
                icon: ShoppingCart,
              },
              {
                label: t("student.exchangesCarriedOut"),
                path: "/dashboard/student/exchanges/exchangescarriedout",
                icon: ShoppingCart,
              },
              {
                label: t("student.proposalsReceived"),
                path: "/dashboard/student/exchanges/proposalreceived",
                icon: Bell,
              },
            ],
          },
        ],
      },
      {
        label: t("student.Donation"),
        icon: Gift,
        children: [
          {
            label: t("student.DonationManagement"),
            icon: TrendingUp, // Add an appropriate icon for the management label
            children: [
              {
                label: t("student.Find a donation offer"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.Submit a donation offer"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.My Donation offers"),
                path: "",
                icon: TrendingUp,
              },
            ],
          },

          {
            label: t("student.My Donation Transactions"),
            icon: TrendingUp, // Add an appropriate icon for the management label
            children: [
              {
                label: t("student.Ongoing Donations"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.Donations made"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.Donations received"),
                path: "",
                icon: TrendingUp,
              },
            ],
          },
        ],
      },

      {
        label: t("student.Campus Market(Sale)"),
        // path: "/dashboard/student/sales",
        icon: ShoppingCart,
        children: [
          {
            label: t("student.Find a good deal"),
            path: "",
            icon: TrendingUp,
          },
          {
            label: t("student.Submit an offer to sell"),
            path: "",
            icon: TrendingUp,
          },
          {
            label: t("student.My Sales offers"),
            path: "",
            icon: TrendingUp,
          },
          {
            label: t("student.My Sales Transactions"),
            icon: LucideShoppingCart,
            children: [
              {
                label: t("student.Current sales"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.Sales made"),
                path: "",
                icon: TrendingUp,
              },
              {
                label: t("student.Proposals received"),
                path: "",
                icon: TrendingUp,
              },
            ],
          },
        ],
      },
      {
        label: t("student.helpSupport"),
        // path: "/dashboard/student/support",
        icon: HelpCircle,
        children: [
          {
            label: t("student.Legal mediation"),
            path: "",
            icon: TrendingUp,
          },
          {
            label: t("student.Alert Management"),
            path: "",
            icon: TrendingUp,
          },
        ],
      },
      {
        label: t("student.Parameters"),
        // path: "/dashboard/student/profile",
        icon: User,
        children: [
          {
            label: t("student.My Profile"),
            path: "",
            icon: TrendingUp,
          },
          {
            label: t("student.My Social Networks"),
            path: "",
            icon: TrendingUp,
          },
        ],
      },
      {
        label: t("student.Logout"),
        icon: LogOut,
      },
    ],
  };

  return roleNavigation[role];
};

//for translation
// import {
//   Home,
//   Users,
//   TrendingUp,
//   Gift,
//   ShoppingCart,
//   Bell,
//   MessageCircle,
//   BookOpen,
//   HelpCircle,
//   User,
// } from "lucide-react";

// export const roleNavigation = {
//   admin: [
//     { label: "Dashboard", path: "/dashboard/admin", icon: Home },
//     { label: "User Management", path: "/dashboard/admin/users", icon: Users },
//     {
//       label: "Trade Management",
//       path: "/dashboard/admin/trades",
//       icon: TrendingUp,
//     },
//     {
//       label: "Donation Management",
//       path: "/dashboard/admin/donations",
//       icon: Gift,
//     },
//     {
//       label: "Sales Management",
//       path: "/dashboard/admin/sales",
//       icon: ShoppingCart,
//     },
//     { label: "Alerts", path: "/dashboard/admin/alerts", icon: Bell },
//   ],
//   student: [
//     {
//       label: "MyCampusClub",
//       icon: MessageCircle,
//       children: [
//         {
//           label: "Messaging",
//           path: "/dashboard/student/messages",
//           icon: MessageCircle,
//         },
//         {
//           label: "Campus Blog",
//           path: "/dashboard/student/blog",
//           icon: BookOpen,
//         },
//       ],
//     },
//     {
//       label: "Exchange Market",
//       icon: TrendingUp,
//       children: [
//         {
//           label: "How It Works",
//           path: "/dashboard/student/howitworks",
//           icon: HelpCircle,
//         },
//         {
//           label: "Exchange Management",
//           icon: TrendingUp,
//           children: [
//             {
//               label: "Find an Exchange Offer",
//               path: "/dashboard/student/exchanges/find",
//               icon: TrendingUp,
//             },
//             {
//               label: "Submit an Exchange Offer",
//               path: "/dashboard/student/exchanges/createexchange",
//               icon: TrendingUp,
//               children: [
//                 {
//                   label: "Exchange Product for a Product",
//                   path: "/dashboard/student/exchanges/productforproduct",
//                   icon: TrendingUp,
//                 },
//                 {
//                   label: "Exchange Product for a Service",
//                   path: "/dashboard/student/productforservice",
//                   icon: TrendingUp,
//                 },
//                 {
//                   label: "Exchange Service for a Service",
//                   path: "/dashboard/student/serviceforservice",
//                   icon: TrendingUp,
//                 },
//                 {
//                   label: "Exchange Service for a Product",
//                   path: "/dashboard/student/serviceforproduct",
//                   icon: TrendingUp,
//                 },
//               ],
//             },
//             {
//               label: "My Exchange Offers",
//               path: "/dashboard/student/exchanges/myexchanges",
//               icon: Gift,
//             },
//           ],
//         },
//         {
//           label: "My Exchange Transactions",
//           icon: ShoppingCart,
//           children: [
//             {
//               label: "Ongoing Exchanges",
//               path: "/dashboard/student/exchanges/ongoingexchanges",
//               icon: ShoppingCart,
//             },
//             {
//               label: "Exchanges Carried Out",
//               path: "/dashboard/student/exchanges/exchangescarriedout",
//               icon: ShoppingCart,
//             },
//             {
//               label: "Proposals Received",
//               path: "/dashboard/student/exchanges/proposalreceived",
//               icon: Bell,
//             },
//           ],
//         },
//       ],
//     },
//     { label: "My Donations", path: "/dashboard/student/donations", icon: Gift },
//     { label: "My Sales", path: "/dashboard/student/sales", icon: ShoppingCart },
//     {
//       label: "Help & Support",
//       path: "/dashboard/student/support",
//       icon: HelpCircle,
//     },
//     { label: "Profile", path: "/dashboard/student/profile", icon: User },
//   ],
// };

// export const roleNavigation = {
//   admin: [
//     { label: "Dashboard", path: "/dashboard/admin" },
//     { label: "User Management", path: "/dashboard/admin/users" },
//     { label: "Trade Management", path: "/dashboard/admin/trades" },
//     { label: "Donation Management", path: "/dashboard/admin/donations" },
//     { label: "Sales Management", path: "/dashboard/admin/sales" },
//     { label: "Alerts", path: "/dashboard/admin/alerts" },
//   ],
//   student: [
//     {
//       label: "MyCampusClub",
//       children: [
//         { label: "Messaging", path: "/dashboard/student/messages" },
//         { label: "Campus Blog", path: "/dashboard/student/blog" },
//       ],
//     },
//     {
//       label: "Exchange Market",
//       children: [
//         {
//           label: "How It Works",
//           path: "/dashboard/student/howitworks",
//         },
//         {
//           label: "Exchange Management",
//           children: [
//             {
//               label: "Find an Exchange Offer",
//               path: "/dashboard/student/exchanges/find",
//             },
//             {
//               label: "Submit an Exchange Offer",
//               path: "/dashboard/student/exchanges/createexchange",
//               children: [
//                 {
//                   label: "Exchange Product for a Product",
//                   path: "/dashboard/student/exchanges/productforproduct",
//                 },
//                 {
//                   label: "Exchange Product for a Service",
//                   path: "/dashboard/student/productforservice",
//                 },
//                 {
//                   label: "Exchange Service for a Service",
//                   path: "/dashboard/student/serviceforservice",
//                 },
//                 {
//                   label: "Exchange Service for a Product",
//                   path: "/dashboard/student/serviceforproduct",
//                 },
//               ],
//             },
//             {
//               label: "My Exchange Offers",
//               path: "/dashboard/student/exchanges/myexchanges",
//             },
//           ],
//         },
//         {
//           label: "My Exchange Transactions",
//           children: [
//             {
//               label: "Ongoing Exchanges",
//               path: "/dashboard/student/exchanges/ongoingexchanges",
//             },
//             {
//               label: "Exchanges Carried Out",
//               path: "/dashboard/student/exchanges/exchangescarriedout",
//             },
//             {
//               label: "Proposals Received",
//               path: "/dashboard/student/exchanges/proposalreceived",
//             },
//           ],
//         },
//       ],
//     },
//     { label: "My Donations", path: "/dashboard/student/donations" },
//     { label: "My Sales", path: "/dashboard/student/sales" },
//     { label: "Help & Support", path: "/dashboard/student/support" },
//     { label: "Profile", path: "/dashboard/student/profile" },
//   ],
// };
