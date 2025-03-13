// /**
//  * Example file demonstrating how to use the @MCPComponent decorator
//  * This shows both class component and functional component implementations
//  */

// import React from 'react';
// import { MCPComponent, ButtonConfig } from '../src/index';

// //
// // Example 1: Class Component with decorator
// //
// @MCPComponent({
//   type: 'button',
//   behavior: { type: 'navigation', href: '/home' },
//   label: 'Home Button',
//   selector: '#home-btn',
//   description: 'Navigates to the home page'
// })
// class HomeButton extends React.Component {
//   render() {
//     return <button id="home-btn">Home</button>;
//   }
// }

// //
// // Example 2: Functional Component with decorator (requires extra setup)
// // Since decorators only work directly with classes in TypeScript,
// // for functional components we need a wrapper class
// //

// // First define the component
// const LoginButton: React.FC = () => {
//   return <button id="login-btn">Login</button>;
// };

// // Then create a wrapper class for the decorator
// @MCPComponent({
//   type: 'button',
//   behavior: { type: 'api', endpoint: '/api/login', method: 'POST' },
//   label: 'Login Button',
//   selector: '#login-btn',
//   description: 'Submits login form via API'
// })
// class LoginButtonWrapper {
//   // This class only exists to hold the metadata
//   static Component = LoginButton;
// }

// // Export wrapped component
// export const EnhancedLoginButton = LoginButtonWrapper.Component;

// // Alternative approach with Higher-Order Component pattern
// function withMCPConfig<T extends React.ComponentType<any>>(
//   Component: T, 
//   config: ButtonConfig
// ): T {
//   // Apply decorator to a class
//   @MCPComponent(config)
//   class WrappedComponent {
//     static OriginalComponent = Component;
//   }
  
//   // Return the original component (now registered with MCP)
//   return WrappedComponent.OriginalComponent;
// }

// // Example usage of HOC approach for functional components
// const LogoutButton: React.FC = () => {
//   return <button id="logout-btn">Logout</button>;
// };

// export const EnhancedLogoutButton = withMCPConfig(
//   LogoutButton,
//   {
//     type: 'button',
//     behavior: { type: 'navigation', href: '/logout' },
//     label: 'Logout Button',
//     selector: '#logout-btn',
//     description: 'Navigates to logout page'
//   }
// );

// // Export class component
// export { HomeButton }; 