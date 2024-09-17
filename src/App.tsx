import { ToastProvider } from "./context";
import { ToastExample } from "./components/Examples";
import { ModalExample } from "./components/Examples";
import "./index.css";

const App = () => (
  <ToastProvider>
    <main className="app-container">
      <ToastExample />
      <ModalExample />
    </main>
  </ToastProvider>
);

export default App;
