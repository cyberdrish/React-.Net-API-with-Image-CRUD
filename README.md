React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
React-.Net-API-w-Image-CRUD

To run the Api change the port no. in EmployeeList.jsx - https://localhost:7182/api/Employee in client application.

To allow client to connect to API if on different Port then make changes in
Program.cs -
app.UseCors(options =>options.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader());
