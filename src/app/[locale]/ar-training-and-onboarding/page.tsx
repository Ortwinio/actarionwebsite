import { createUseCasePage } from "../useCasePageFactory";

const slug = "ar-training-and-onboarding";
const { Page, generateMetadata, dynamic } = createUseCasePage(slug);

export { generateMetadata, dynamic };
export default Page;

