import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


export const sumTotalPrice = (items)=> {
    let total = 0;
    for (const product of items) {
        total += product.product.price * product.quantity;
    }
    return total;
}
