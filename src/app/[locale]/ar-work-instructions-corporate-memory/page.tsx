import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-work-instructions-corporate-memory";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

