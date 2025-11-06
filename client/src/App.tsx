import { Button } from "./components/ui/button";
import { handleHelloWorld } from "./handlers/api";

function App() {
    return (
        <div>
            <h1>Hello World!</h1>
            <Button onClick={handleHelloWorld}>Hello World</Button>
        </div>
    );
}

export default App;
