import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-guided-assembly-production";
const { Page, generateMetadata } = createUseCasePage(slug);

export { generateMetadata };
export default Page;

