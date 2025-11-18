import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-guided-changeover-batch-preparation";
const { Page, generateMetadata } = createUseCasePage(slug);

export { generateMetadata };
export default Page;

