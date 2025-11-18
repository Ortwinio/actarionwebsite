import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-preventive-maintenance";
const { Page, generateMetadata } = createUseCasePage(slug);

export { generateMetadata };
export default Page;

