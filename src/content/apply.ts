/**
 * The programme application form — field definitions and page copy.
 *
 * The field list is data, not JSX, so that the form component, the server
 * validator and the notification email all read from ONE source. A field
 * added here appears in all three; a field renamed here cannot drift out of
 * sync with the email the foundation receives.
 */

export const programmes = [
  "Education support / school fees",
  "Scholarship",
  "Learning materials & school items",
  "Leadership & mentorship",
  "Skills training & empowerment",
  "Health & wellness outreach",
  "Widows & single mothers support",
  "Elderly citizens support",
  "Community relief (food & provisions)",
  "Volunteering with the foundation",
  "Partnership or sponsorship enquiry",
] as const;

export const genders = ["Female", "Male", "Prefer not to say"] as const;

export const statuses = [
  "In secondary school",
  "In tertiary education",
  "Completed secondary school, not in school",
  "Out of school",
  "Employed",
  "Self-employed / trading",
  "Unemployed",
  "Other",
] as const;

export type FieldName =
  | "fullName"
  | "phone"
  | "email"
  | "age"
  | "gender"
  | "location"
  | "status"
  | "programme"
  | "reason";

type BaseField = {
  name: FieldName;
  label: string;
  required: boolean;
  /** Rendered under the input. Keep it short — it is read, not skimmed. */
  hint?: string;
  /** Full row in the two-column grid. */
  wide?: boolean;
};

export type Field = BaseField &
  (
    | { control: "text"; type: "text" | "tel" | "email" | "number"; placeholder?: string; autoComplete?: string; min?: number; max?: number }
    | { control: "select"; options: readonly string[] }
    | { control: "textarea"; placeholder?: string; rows: number; maxLength: number }
  );

export const fields: Field[] = [
  {
    name: "fullName",
    label: "Full name",
    required: true,
    control: "text",
    type: "text",
    autoComplete: "name",
    placeholder: "As it appears on your documents",
    wide: true,
  },
  {
    name: "phone",
    label: "Phone / WhatsApp number",
    required: true,
    control: "text",
    type: "tel",
    autoComplete: "tel",
    placeholder: "0800 000 0000",
    hint: "We will contact you on this number, so use one that reaches you.",
  },
  {
    name: "email",
    label: "Email address",
    required: true,
    control: "text",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    name: "age",
    label: "Age",
    required: true,
    control: "text",
    type: "number",
    min: 1,
    max: 120,
    placeholder: "18",
  },
  {
    name: "gender",
    label: "Gender",
    required: true,
    control: "select",
    options: genders,
  },
  {
    name: "location",
    label: "Location",
    required: true,
    control: "text",
    type: "text",
    autoComplete: "address-level2",
    placeholder: "Town or city, and state",
    wide: true,
  },
  {
    name: "status",
    label: "Educational / employment status",
    required: true,
    control: "select",
    options: statuses,
    wide: true,
  },
  {
    name: "programme",
    label: "Programme you are applying for",
    required: true,
    control: "select",
    options: programmes,
    wide: true,
  },
  {
    name: "reason",
    label: "Why are you applying?",
    required: true,
    control: "textarea",
    rows: 6,
    maxLength: 1500,
    placeholder:
      "Tell us about your situation and what this support would make possible. A few honest sentences are enough.",
    hint: "Your own words matter more than long ones.",
    wide: true,
  },
];

export const applyPage = {
  eyebrow: "Applications",
  heading: "Apply for a Programme",
  intro:
    "This form is how the foundation receives applications. Everything you send goes straight to the team, and we review each one in the order it arrives.",

  formHeading: "Application form",
  formIntro:
    "All fields marked with an asterisk are required. Take your time — a considered application is easier for us to act on than a fast one.",

  /**
   * Documents are NOT uploaded here by design: asking people to hand over
   * identity documents to a web form creates a data-protection duty the
   * foundation is not yet set up to carry. They are requested later, by a
   * person, only where a programme genuinely needs them.
   */
  documentsNote:
    "Do not attach documents to this form. Where a programme requires supporting documents — a school letter, a result slip, a medical or bereavement record — a member of the team will ask you for them directly once your application has been reviewed.",

  consentLabel:
    "I confirm the information above is true, and I agree to the foundation storing it for the purpose of assessing my application.",

  submitLabel: "Submit application",
  submittingLabel: "Sending…",

  successHeading: "Your application has been received",
  successBody:
    "It is now with the foundation's team. We review applications in the order they arrive and will contact you on the phone number or email you gave us. If your situation is urgent, send us a message on WhatsApp and mention that you have already applied.",
  successAgainLabel: "Submit another application",

  errorHeading: "That did not send",
  errorFallback:
    "Something went wrong on our side and your application was not submitted. Please try again — or send it to us on WhatsApp or by email so nothing is lost.",

  enquiriesHeading: "Questions before you apply?",
  enquiriesBody:
    "Applications belong in the form above — it keeps everything in one place and means nothing gets lost in a message thread. For anything else, these reach us directly.",
} as const;
