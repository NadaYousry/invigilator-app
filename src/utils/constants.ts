export const EXAM_SUBMISSIONS_STATUSES = {
  paper: 1,
  pending: 2,
  absent: 3,
  submission: 4,
  autoLocked: 5,
};
export const EXAM_SUBMISSIONS_STATUS_ACTIONS = {
  paper: 1,
  restart: 2,
  absent: 3,
  reset: 4,
  unlock: 5,
};

export const EXAM_SUBMISSIONS_STATUS_ACTIONS_TEXT = {
  [EXAM_SUBMISSIONS_STATUS_ACTIONS?.paper]: {
    text: "Confirm Changing To Paper? This Student Can Go Back to Device.",
  },
  [EXAM_SUBMISSIONS_STATUS_ACTIONS?.restart]: {
    text: "This Action Will Completely Delete The Current Result of The Examinee and Will Allow to Restart Tha Exam Again, Proceed?",
  },

  [EXAM_SUBMISSIONS_STATUS_ACTIONS?.reset]: {
    text: "This Action Will Completely Delete The Current Examinee Time, Proceed?",
  },
  [EXAM_SUBMISSIONS_STATUS_ACTIONS?.unlock]: {
    text: "This Student Was AutoLocked and Kicked out from Exam Because of Existing the Pinning Mode App, Confirm Unlocking and Enabling The Session Back ?",
  },
};

export const PAPER_LOCKED_STATUS_ACTIONS = [
  {
    label: "Restart Session",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.reset,
  },
];
export const PENDING_STATUS_ACTIONS = [
  {
    label: "Switch To Paper",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.paper,
  },
  {
    label: "Restart Session",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.restart,
  },
];

export const ABSENT_STATUS_ACTIONS = [
  {
    label: "Switch To Paper",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.paper,
  },
];

export const SUBMISSION_STATUS_ACTIONS = [
  {
    label: "Reset Session Timer",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.reset,
  },
  {
    label: "Restart Session",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.restart,
  },
];

export const AUTO_LOCKED_STATUS_ACTIONS = [
  {
    label: "Unlock Session",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.unlock,
  },
  {
    label: "Restart Session",
    key: EXAM_SUBMISSIONS_STATUS_ACTIONS?.reset,
  },
];
