import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-guided-assembly-production";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

