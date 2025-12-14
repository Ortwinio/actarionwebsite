// lib/roi/fieldConfig.ts

export type RoiFieldType =
  | "number"
  | "percent"
  | "currency"
  | "integer"
  | "years";

export interface RoiFieldConfigItem {
  id: string;
  label: string;
  tooltip: string;
  placeholder?: string;
  type?: RoiFieldType;
}

export const roiFieldConfig = {
  // --------------------------------------------------
  // A. Operation / workforce
  // --------------------------------------------------
  N_sites: {
    id: "N_sites",
    label: "Number of sites",
    tooltip:
      "How many plants or sites will use AR-guided SOPs in this scenario.",
    placeholder: "1",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  N_op: {
    id: "N_op",
    label: "Operators using these SOPs",
    tooltip:
      "Operators who regularly perform the procedures you plan to support with AR.",
    placeholder: "25",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  N_new: {
    id: "N_new",
    label: "New operators per year",
    tooltip:
      "Rough estimate of new hires or internal transfers that need training each year.",
    placeholder: "6",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  Exec_per_op_per_year: {
    id: "Exec_per_op_per_year",
    label: "SOP executions per operator per year",
    tooltip:
      "Average number of times per year each operator runs these procedures (e.g. setups, changeovers, inspections).",
    placeholder: "400",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // B. Training & labor (generic)
  // --------------------------------------------------
  H_train_base: {
    id: "H_train_base",
    label: "Training hours per new operator today",
    tooltip:
      "Total training time before a new operator can work independently, including classroom, on-the-job and shadowing.",
    placeholder: "24",
    type: "number",
  } satisfies RoiFieldConfigItem,

  H_train_AR: {
    id: "H_train_AR",
    label: "Training hours per new operator with AR",
    tooltip:
      "Expected training time once AR-guided SOPs are in place. Often 30–50% lower than today.",
    placeholder: "14",
    type: "number",
  } satisfies RoiFieldConfigItem,

  C_hour_op: {
    id: "C_hour_op",
    label: "Hourly cost of operator (€)",
    tooltip:
      "Fully loaded hourly cost for an operator, including salary, social costs and overhead.",
    placeholder: "40",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  C_hour_trainer: {
    id: "C_hour_trainer",
    label: "Hourly cost of trainer / expert (€)",
    tooltip:
      "Fully loaded hourly cost for trainers, subject-matter experts or supervisors involved in training.",
    placeholder: "60",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // C. Quality & errors (generic)
  // --------------------------------------------------
  Error_rate_base: {
    id: "Error_rate_base",
    label: "Current error rate on these procedures (%)",
    tooltip:
      "Percentage of executions that result in scrap, rework, deviation or corrective action.",
    placeholder: "3",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Error_rate_AR: {
    id: "Error_rate_AR",
    label: "Expected error rate with AR (%)",
    tooltip:
      "Expected error rate once AR-guided SOPs are deployed. In many projects this drops by 30–70%.",
    placeholder: "1.5",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Cost_per_error: {
    id: "Cost_per_error",
    label: "Average cost per error (€)",
    tooltip:
      "Average total cost of one error, including scrap, rework time, extra quality checks, lost batches and customer impact.",
    placeholder: "250",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // D. Downtime (generic)
  // --------------------------------------------------
  H_downtime_base_per_year: {
    id: "H_downtime_base_per_year",
    label: "Downtime hours/year due to SOP issues",
    tooltip:
      "Unplanned downtime hours per year caused by incorrect setup, changeover mistakes or procedural errors.",
    placeholder: "40",
    type: "number",
  } satisfies RoiFieldConfigItem,

  Downtime_reduction_pct: {
    id: "Downtime_reduction_pct",
    label: "Expected reduction in SOP-related downtime (%)",
    tooltip:
      "Estimated percentage reduction in downtime after standardising and guiding SOPs with AR.",
    placeholder: "40",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Cost_per_downtime_hour: {
    id: "Cost_per_downtime_hour",
    label: "Cost per hour of downtime (€)",
    tooltip:
      "Rough estimate of lost margin or OEE impact per hour when a critical line or asset is not running.",
    placeholder: "2000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // E. Remote support / travel (generic)
  // --------------------------------------------------
  Visits_per_year: {
    id: "Visits_per_year",
    label: "On-site expert visits per year",
    tooltip:
      "Number of on-site troubleshooting or training visits by internal experts or external vendors per year.",
    placeholder: "20",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  Cost_per_visit: {
    id: "Cost_per_visit",
    label: "Average cost per expert visit (€)",
    tooltip:
      "Total cost of one on-site visit, including travel time, travel expenses and lost productive time.",
    placeholder: "800",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  Visit_reduction_pct: {
    id: "Visit_reduction_pct",
    label: "Expected reduction in on-site visits (%)",
    tooltip:
      "Estimated percentage of visits that can be replaced by remote expert support and AR-guided troubleshooting.",
    placeholder: "50",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // F. Software costs (licenses)
  // --------------------------------------------------
  C_license_user_year: {
    id: "C_license_user_year",
    label: "License cost per user per year (€)",
    tooltip:
      "Annual software license cost per active AR user (authors + viewers).",
    placeholder: "600",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  N_users: {
    id: "N_users",
    label: "Number of AR users",
    tooltip:
      "Total number of users who will access AR-guided SOPs or author content.",
    placeholder: "30",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  C_license_site_year: {
    id: "C_license_site_year",
    label: "Fixed license cost per site per year (€)",
    tooltip:
      "Any additional fixed annual platform or site fee, if applicable. Leave at 0 if not used.",
    placeholder: "0",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // G. Hardware costs
  // --------------------------------------------------
  N_devices: {
    id: "N_devices",
    label: "Number of devices (tablets / smart glasses)",
    tooltip:
      "Number of dedicated devices that will be used for AR-guided SOPs at the sites in scope.",
    placeholder: "15",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  C_device_per_user: {
    id: "C_device_per_user",
    label: "Average device cost (€)",
    tooltip:
      "Average investment per device, such as a rugged tablet or smart glasses, including accessories if relevant.",
    placeholder: "1200",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  Device_lifetime_years: {
    id: "Device_lifetime_years",
    label: "Device lifetime (years)",
    tooltip:
      "Number of years over which you want to depreciate or spread the device investment.",
    placeholder: "3",
    type: "years",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // H. Implementation, content & internal time
  // --------------------------------------------------
  Implementation_one_time: {
    id: "Implementation_one_time",
    label: "One-time implementation cost (€)",
    tooltip:
      "One-time cost for implementation, integration, configuration and initial onboarding of the AR platform.",
    placeholder: "25000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  Content_initial: {
    id: "Content_initial",
    label: "One-time AR content creation cost (€)",
    tooltip:
      "Initial effort to convert your most critical SOPs into AR workflows (engineering, SME, and content work).",
    placeholder: "15000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  Content_annual: {
    id: "Content_annual",
    label: "Annual content maintenance cost (€)",
    tooltip:
      "Estimated yearly effort to keep AR SOPs up to date when processes, products or equipment change.",
    placeholder: "8000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  Internal_PM_hours: {
    id: "Internal_PM_hours",
    label: "Internal project management hours/year",
    tooltip:
      "Estimated internal time spent on coordination, stakeholder management and governance for this AR program.",
    placeholder: "120",
    type: "number",
  } satisfies RoiFieldConfigItem,

  Internal_PM_rate: {
    id: "Internal_PM_rate",
    label: "Internal PM hourly rate (€)",
    tooltip:
      "Fully loaded hourly cost for internal project or program managers involved in the AR rollout.",
    placeholder: "70",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // I. Financial horizon & adoption
  // --------------------------------------------------
  Horizon_years: {
    id: "Horizon_years",
    label: "Business case horizon (years)",
    tooltip:
      "Number of years over which you want to evaluate the AR investment and returns.",
    placeholder: "3",
    type: "years",
  } satisfies RoiFieldConfigItem,

  Discount_rate: {
    id: "Discount_rate",
    label: "Discount rate for NPV (%)",
    tooltip:
      "Financial discount rate used to calculate Net Present Value (NPV). Often 8–10% for industrial projects.",
    placeholder: "8",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Adoption_year1: {
    id: "Adoption_year1",
    label: "Adoption in year 1 (%)",
    tooltip:
      "Estimated share of full AR potential realised in year 1 (e.g. 60% if only one line or site is live).",
    placeholder: "60",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Adoption_year2: {
    id: "Adoption_year2",
    label: "Adoption in year 2 (%)",
    tooltip:
      "Estimated share of full AR potential realised in year 2 as rollout expands.",
    placeholder: "80",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  Adoption_year3: {
    id: "Adoption_year3",
    label: "Adoption in year 3 (%)",
    tooltip:
      "Estimated share of full AR potential realised in year 3 and beyond (often 100% when fully rolled out).",
    placeholder: "100",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // J. Use case – Error-free assembly
  // --------------------------------------------------
  assembly_unitsPerYear: {
    id: "assembly_unitsPerYear",
    label: "Assemblies per year (use case)",
    tooltip:
      "Number of assemblies or finished units per year that are in scope for AR-guided work instructions.",
    placeholder: "50000",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  assembly_errorRateBase: {
    id: "assembly_errorRateBase",
    label: "Current assembly error rate (%)",
    tooltip:
      "Percentage of assemblies that require rework, scrap, or corrective action today.",
    placeholder: "3",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  assembly_errorRateAr: {
    id: "assembly_errorRateAr",
    label: "Assembly error rate with AR (%)",
    tooltip:
      "Expected error rate once operators follow AR-guided assembly instructions.",
    placeholder: "1.5",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  assembly_costPerError: {
    id: "assembly_costPerError",
    label: "Cost per assembly error (€)",
    tooltip:
      "Average cost of one assembly error, including scrap, rework and extra checks.",
    placeholder: "200",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  assembly_trainingHoursBase: {
    id: "assembly_trainingHoursBase",
    label: "Assembly training hours per new operator",
    tooltip:
      "Training hours specifically related to assembly tasks before AR is introduced.",
    placeholder: "16",
    type: "number",
  } satisfies RoiFieldConfigItem,

  assembly_trainingHoursAr: {
    id: "assembly_trainingHoursAr",
    label: "Assembly training hours with AR",
    tooltip:
      "Expected training hours for assembly after AR-guided instructions are deployed.",
    placeholder: "8",
    type: "number",
  } satisfies RoiFieldConfigItem,

  assembly_newOperatorsPerYear: {
    id: "assembly_newOperatorsPerYear",
    label: "New assembly operators per year",
    tooltip:
      "Number of new operators per year who will be trained specifically for assembly work.",
    placeholder: "4",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  assembly_operatorRate: {
    id: "assembly_operatorRate",
    label: "Assembly operator hourly cost (€)",
    tooltip:
      "Fully loaded hourly cost for operators performing assembly tasks.",
    placeholder: "40",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  assembly_trainerRate: {
    id: "assembly_trainerRate",
    label: "Assembly trainer hourly cost (€)",
    tooltip:
      "Hourly cost for trainers or experts focusing on assembly training.",
    placeholder: "60",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // K. Use case – AR-guided changeovers (SMED)
  // --------------------------------------------------
  changeover_changeoversPerYear: {
    id: "changeover_changeoversPerYear",
    label: "Changeovers per year",
    tooltip:
      "Number of product changeovers per year on the lines in scope for AR-guided changeover SOPs.",
    placeholder: "1200",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  changeover_timeBaseMinutes: {
    id: "changeover_timeBaseMinutes",
    label: "Average changeover time today (minutes)",
    tooltip:
      "Average time a changeover takes today from last good piece to first good piece.",
    placeholder: "45",
    type: "number",
  } satisfies RoiFieldConfigItem,

  changeover_timeArMinutes: {
    id: "changeover_timeArMinutes",
    label: "Average changeover time with AR (minutes)",
    tooltip:
      "Expected average changeover time once operators follow AR-guided changeover SOPs.",
    placeholder: "30",
    type: "number",
  } satisfies RoiFieldConfigItem,

  changeover_costPerMinute: {
    id: "changeover_costPerMinute",
    label: "Cost per minute of changeover (€)",
    tooltip:
      "Estimated lost margin or OEE impact per minute during changeover (line not producing).",
    placeholder: "30",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  changeover_scrapCostBasePerChangeover: {
    id: "changeover_scrapCostBasePerChangeover",
    label: "Scrap cost per changeover today (€)",
    tooltip:
      "Average scrap cost during ramp-up after each changeover with the current process.",
    placeholder: "150",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  changeover_scrapCostArPerChangeover: {
    id: "changeover_scrapCostArPerChangeover",
    label: "Scrap cost per changeover with AR (€)",
    tooltip:
      "Expected scrap cost per changeover once the process is standardised and guided with AR.",
    placeholder: "75",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // L. Use case – Data-driven / AR-guided maintenance
  // --------------------------------------------------
  maintenance_downtimeHoursBasePerYear: {
    id: "maintenance_downtimeHoursBasePerYear",
    label: "Maintenance-related downtime hours/year",
    tooltip:
      "Total unplanned downtime hours per year related to breakdowns, incorrect maintenance, or troubleshooting issues.",
    placeholder: "60",
    type: "number",
  } satisfies RoiFieldConfigItem,

  maintenance_downtimeReductionPct: {
    id: "maintenance_downtimeReductionPct",
    label: "Expected reduction in maintenance downtime (%)",
    tooltip:
      "Estimated percentage reduction in maintenance-related downtime when maintenance is standardised and supported with AR.",
    placeholder: "35",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  maintenance_costPerDowntimeHour: {
    id: "maintenance_costPerDowntimeHour",
    label: "Cost per hour of maintenance downtime (€)",
    tooltip:
      "Estimated cost per hour when equipment is down due to maintenance-related issues.",
    placeholder: "2000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  maintenance_emergencyVisitsPerYear: {
    id: "maintenance_emergencyVisitsPerYear",
    label: "Emergency maintenance visits per year",
    tooltip:
      "Number of urgent on-site visits by specialists for maintenance-related issues per year.",
    placeholder: "15",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  maintenance_costPerVisit: {
    id: "maintenance_costPerVisit",
    label: "Cost per emergency maintenance visit (€)",
    tooltip:
      "Average cost per urgent visit, including travel time, travel costs and lost productive time.",
    placeholder: "1000",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  maintenance_visitReductionPct: {
    id: "maintenance_visitReductionPct",
    label: "Reduction in emergency visits with AR (%)",
    tooltip:
      "Estimated percentage of emergency visits that can be prevented or handled remotely using AR.",
    placeholder: "40",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // M. Use case – Fast fault recovery (remote expert)
  // --------------------------------------------------
  fault_incidentsPerYear: {
    id: "fault_incidentsPerYear",
    label: "Fault incidents per year",
    tooltip:
      "Number of significant equipment or process faults per year where production is impacted.",
    placeholder: "50",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  fault_mttrBaseHours: {
    id: "fault_mttrBaseHours",
    label: "Mean time to repair today (hours)",
    tooltip:
      "Average time to restore normal operation after a fault with the current way of working.",
    placeholder: "4",
    type: "number",
  } satisfies RoiFieldConfigItem,

  fault_mttrArHours: {
    id: "fault_mttrArHours",
    label: "Mean time to repair with AR (hours)",
    tooltip:
      "Expected average repair time when technicians are supported by AR workflows and remote experts.",
    placeholder: "2.5",
    type: "number",
  } satisfies RoiFieldConfigItem,

  fault_costPerDowntimeHour: {
    id: "fault_costPerDowntimeHour",
    label: "Cost per hour of fault-related downtime (€)",
    tooltip:
      "Estimated cost per hour when equipment is down due to faults or breakdowns.",
    placeholder: "2500",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  fault_onsiteVisitsPerYear: {
    id: "fault_onsiteVisitsPerYear",
    label: "On-site fault troubleshooting visits/year",
    tooltip:
      "Number of on-site visits by experts specifically for fault troubleshooting per year.",
    placeholder: "30",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  fault_costPerVisit: {
    id: "fault_costPerVisit",
    label: "Cost per troubleshooting visit (€)",
    tooltip:
      "Average cost per on-site fault troubleshooting visit, including travel and time.",
    placeholder: "900",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  fault_visitReductionPct: {
    id: "fault_visitReductionPct",
    label: "Reduction in fault visits with AR (%)",
    tooltip:
      "Estimated percentage of fault-related visits that can be solved remotely using AR and remote expert support.",
    placeholder: "50",
    type: "percent",
  } satisfies RoiFieldConfigItem,

  // --------------------------------------------------
  // N. Use case – Onboarding & training (scenario-specific)
  // --------------------------------------------------
  training_newOperatorsPerYear: {
    id: "training_newOperatorsPerYear",
    label: "New operators/year in this scenario",
    tooltip:
      "Number of new operators per year in the scope of this specific onboarding and training use case.",
    placeholder: "10",
    type: "integer",
  } satisfies RoiFieldConfigItem,

  training_trainingHoursBase: {
    id: "training_trainingHoursBase",
    label: "Training hours per new operator today (use case)",
    tooltip:
      "Training hours per new operator for the specific roles or lines in this training use case.",
    placeholder: "30",
    type: "number",
  } satisfies RoiFieldConfigItem,

  training_trainingHoursAr: {
    id: "training_trainingHoursAr",
    label: "Training hours per new operator with AR (use case)",
    tooltip:
      "Expected training hours per new operator for this use case once AR is implemented.",
    placeholder: "16",
    type: "number",
  } satisfies RoiFieldConfigItem,

  training_operatorRate: {
    id: "training_operatorRate",
    label: "Operator hourly cost in this use case (€)",
    tooltip:
      "Hourly cost for operators whose onboarding is modelled in this specific training scenario.",
    placeholder: "40",
    type: "currency",
  } satisfies RoiFieldConfigItem,

  training_trainerRate: {
    id: "training_trainerRate",
    label: "Trainer hourly cost in this use case (€)",
    tooltip:
      "Hourly cost for trainers or mentors involved in this scenario’s onboarding and training.",
    placeholder: "60",
    type: "currency",
  } satisfies RoiFieldConfigItem,
} satisfies Record<string, RoiFieldConfigItem>;
