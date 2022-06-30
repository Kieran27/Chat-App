import { useUserAuth } from "../../Auth/authentication-context.js"

const { user } = useUserAuth();

export function foo() {
    // ...
}
export function bar() {
    // ...
}

export const userBackgroundImage = {
  backgroundImage : 'url',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'no-size',
  backgroundPosition: 'center'
}
