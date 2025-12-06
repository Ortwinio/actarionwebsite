import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-remote-expert-support-corrective-maintenance";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

