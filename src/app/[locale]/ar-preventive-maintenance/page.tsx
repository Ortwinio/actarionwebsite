import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-preventive-maintenance";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

