import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-work-instructions-corporate-memory";
const { Page, generateMetadata } = createUseCasePage(slug);

export { generateMetadata };
export default Page;

