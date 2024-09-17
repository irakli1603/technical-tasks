# This is submission for components Toast and Modal

To run this project:

- clone this repo;
- run `npm i`;
- start project by `npm run dev`;
- jump to specified url provided in console;

for both of these tasks you can find usage examples in `components/Examples` folder.

## Task 1:

Third party usage

1. wrap application in `ToastProvider.tsx`

```js
import { ToastProvider } from "./context";

const App = () => (
  <ToastProvider>
    {/* ...components that will be able to use toaster notifications */}
  </ToastProvider>
);

export default App;
```

2. usage in some component inside of `ToastProvider.tsx`

```js
import {
  ToastPosition,
  ToastStatus,
} from "src/constants";
import { useToast } from "src/hooks";

export const Example = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      status: ToastStatus.SUCCESS,
      title: 'Success!',
      message: 'Form submitted successfully!',
      position: ToastPosition.TOP_LEFT, // optional, defaults to 'top-right' 
      duration: 5000, // Optional: default to 5000ms if not provided
    });
  };


  return (
    <button onClick={handleClick}>Submit Form</button>
  );
};
```

## Task 2:

Third party usage:

just import `Modal.tsx` in your component and choose desired size from `ModalSize` enum:

```js
import { useState } from "react";
import { Modal } from "src/components/Modal";
import { ModalSize } from "src/constants";

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="some modal"
        size={ModalSize.SMALL}
        footerActions={[
          { label: "Action", onClick: () => alert("Some action") },
        ]}
      >
        <p>Some text</p>
      </Modal>
    </div>
  )
```

