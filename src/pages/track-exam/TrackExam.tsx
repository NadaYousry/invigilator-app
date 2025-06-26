import { useEffect, useState } from "react";
import { Dropdown, Form, Modal, Select, TreeSelect } from "antd";
import type { ColumnsType } from "antd/es/table";
import StatusTag from "@components/status-tag/StatusTag";
import { DownOutlined } from "@ant-design/icons";
import Button from "@components/button/Button";
import Table from "@components/table/Table";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IPayloadWithId, RootState } from "@appTypes/generalTypes";
import {
  getCourses,
  getExamAreas,
  getExaminees,
  getExamSessionStatuses,
  getGroups,
} from "@store/lookupSlice";
import { getAssessments } from "@store/assessments";
import { AppDispatch } from "@store";
import {
  AssessmentData,
  AssessmentsFormFilters,
  IExamRecord,
} from "@pages/track-exam/TrackExamTypes";
import {
  editExamSubmissions,
  getExamSubmissions,
} from "@store/examSubmissions";
import {
  ABSENT_STATUS_ACTIONS,
  AUTO_LOCKED_STATUS_ACTIONS,
  EXAM_SUBMISSIONS_STATUS_ACTIONS,
  EXAM_SUBMISSIONS_STATUS_ACTIONS_TEXT,
  EXAM_SUBMISSIONS_STATUSES,
  PAPER_LOCKED_STATUS_ACTIONS,
  PENDING_STATUS_ACTIONS,
  SUBMISSION_STATUS_ACTIONS,
} from "@utils/constants";
import { ConfirmModal } from "@components/confirm-modal/ConfirmModal";

function App() {
  const { lookups, assessments, examSubmissions } = useSelector(
    (state: RootState) => state
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();

  const initialPayload = { examId: params?.id };
  const initialConfirmationData = {
    record: null, // to update this record on JSON DB
    keyId: null, // to check what action user clicked
  };
  const assessmentsDetails: AssessmentData =
    assessments?.list && assessments.list.length > 0 && assessments.list[0]
      ? (assessments.list[0] as AssessmentData)
      : ({} as AssessmentData);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examineeDetails, setExamineeDetails] = useState<IExamRecord | null>(
    null
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setExamineeDetails(null);
  };
  const [confirmData, setConfirmData] = useState<{
    record: null | IExamRecord;
    keyId: null | string;
  }>(initialConfirmationData);

  useEffect(() => {
    // get lookups to filter data
    dispatch(getExamSessionStatuses());
    dispatch(getExamAreas());
    dispatch(getExaminees());
    dispatch(getGroups());
    // get assessments list
    if (params?.id) {
      // get details for exam form json to show it on page above listing
      dispatch(getAssessments({ trackedExamId: params?.id }));

      //get exam submission list by filtring json data by this examid on params
      dispatch(getExamSubmissions(initialPayload));
    }
  }, [params?.id]);

  const onFinish = (values: AssessmentsFormFilters) => {
    dispatch(getExamSubmissions({ ...values, ...initialPayload }));
  };
  // add reset button
  // const onReset = () => {
  //   form.resetFields();
  // };
  const resetConfirmationModal = () => {
    setOpenConfirm(false);
    setConfirmData(initialConfirmationData);
  };
  const editRecordStatus = (
    id: IPayloadWithId["id"],
    payload: IPayloadWithId["payload"]
  ) => {
    dispatch(
      editExamSubmissions({
        id,
        payload,
      })
    )
      .then(() => {
        dispatch(getExamSubmissions(initialPayload));
      })
      .finally(() => resetConfirmationModal());
  };
  const handleChangeStatus = () => {
    if (confirmData?.keyId && confirmData?.record?.id) {
      let payload = {};
      switch (parseInt(confirmData?.keyId)) {
        case EXAM_SUBMISSIONS_STATUS_ACTIONS.paper: {
          payload = {
            status: "Pending",
            statusId: EXAM_SUBMISSIONS_STATUSES.pending,
          };
          break;
        }
        case EXAM_SUBMISSIONS_STATUS_ACTIONS.reset:
          {
            payload = {
              timeElapsed: {
                min: null,
                seconds: null,
              },
            };
            break;
          }
          break;
        case EXAM_SUBMISSIONS_STATUS_ACTIONS.unlock: {
          payload = {
            status: "Pending",
            statusId: EXAM_SUBMISSIONS_STATUSES.pending,
          };
          break;
        }
        case EXAM_SUBMISSIONS_STATUS_ACTIONS.restart: {
          payload = {
            status: "Pending",
            statusId: EXAM_SUBMISSIONS_STATUSES.pending,
            questionSynced: null,
            timeElapsed: {
              min: null,
              seconds: null,
            },
          };
          break;
        }
        default:
          break;
      }
      editRecordStatus(confirmData?.record?.id, payload);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenChangeStatusConfirm = (item: any, row: IExamRecord) => {
    setOpenConfirm(true);
    setConfirmData({
      keyId: item?.key,
      record: row,
    });
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    resetConfirmationModal();
  };

  const columns: ColumnsType = [
    {
      title: "User Name",
      dataIndex: "examineeUserName",
      key: "examineeUserName",
      sorter: (a, b) => a.examineeUserName.localeCompare(b.examineeUserName),
      render: (text: string, row) => (
        <p
          className="underline text-blue cursor-pointer"
          onClick={() => {
            showModal();
            setExamineeDetails(row as IExamRecord);
          }}
        >
          {text || "-"}
        </p>
      ),
    },

    {
      title: "Full Name",
      dataIndex: "examineeFullName",
      key: "examineeFullName",
      sorter: (a, b) => a.examineeFullName.localeCompare(b.examineeFullName),
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",

      render: (text: string) => <p>{text ? "Yes" : "No"}</p>,
    },
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
      render: (text: string) => <p>{text ? "Yes" : "No"}</p>,
    },
    {
      title: "Question Synced",
      dataIndex: "questionSynced",
      key: "questionSynced",

      render: (text: string) => <p>{text || "-"}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text, row) => (
        <StatusTag
          status={text}
          className={` text-nowrap ${
            row?.statusId === 1
              ? "bg-green-100"
              : row?.statusId === 2
              ? "bg-yellow"
              : row?.statusId === 3
              ? "bg-light-red"
              : row?.statusId === 5
              ? "bg-gray"
              : "bg-white border border-gray"
          }`}
        />
      ),
    },
    {
      title: "Time Elapsed",
      dataIndex: "timeElapsed",
      key: "timeElapsed",
      // sorter: (a, b) => a.area.localeCompare(b.area),
      render: (time) => (
        <p>
          {!time?.min && !time?.seconds
            ? "-"
            : `
          ${time?.min ? ` ${time?.min} mins` : ""}, ${
                time?.seconds ? ` ${time?.seconds} seconds` : ""
              }
          `}
        </p>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, row) => (
        <>
          <Dropdown
            menu={{
              items:
                row?.statusId === EXAM_SUBMISSIONS_STATUSES.paper
                  ? PAPER_LOCKED_STATUS_ACTIONS
                  : row?.statusId === EXAM_SUBMISSIONS_STATUSES.absent
                  ? ABSENT_STATUS_ACTIONS
                  : row?.statusId === EXAM_SUBMISSIONS_STATUSES.autoLocked
                  ? AUTO_LOCKED_STATUS_ACTIONS
                  : row?.statusId === EXAM_SUBMISSIONS_STATUSES.pending
                  ? PENDING_STATUS_ACTIONS
                  : row?.statusId === EXAM_SUBMISSIONS_STATUSES.submission
                  ? SUBMISSION_STATUS_ACTIONS
                  : [],
              onClick: (item) =>
                handleOpenChangeStatusConfirm(item, row as IExamRecord),
            }}
            trigger={["click"]}
          >
            <Button variant="outlined" color="primary" type="default">
              Choose Action
              <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];
  const handleProgramChange = (value: number) => {
    dispatch(getCourses(value));
  };

  return (
    <div>
      <div className="bg-white rounded-md p-4 grid  grid-cols-2 mb-[3rem] gap-4 relative">
        <p className="flex items-center gap-3">
          <span className="font-bold">Exam Name:</span>
          <span>{assessmentsDetails?.name}</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="font-bold">Exam Date:</span>
          <span>
            {new Date(assessmentsDetails?.startDate).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center gap-3">
          <span className="font-bold">Exam Area:</span>
          <span>{assessmentsDetails?.area}</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="font-bold">Examinees Assigned:</span>
          <span>{assessmentsDetails?.mentorsCount}</span>
        </p>
      </div>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        layout="vertical"
        className="grid lg:grid-cols-5 grid-cols-2 gap-2 mb-4 w-full !mb-4"
      >
        <Form.Item name="areaId">
          <Select
            allowClear
            showSearch
            placeholder="Area"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.examAreas}
          />
        </Form.Item>

        <Form.Item name="groupId">
          <TreeSelect
            allowClear
            showSearch
            placeholder="Group"
            onChange={handleProgramChange}
            treeNodeFilterProp={"label"}
            treeData={lookups.groups}
            treeLine
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item name="examineeId">
          <Select
            allowClear
            showSearch
            placeholder="Examinees"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.examinees}
          />
        </Form.Item>
        <Form.Item name="statusId">
          <Select
            allowClear
            showSearch
            placeholder="Status"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.examStatuses}
          />
        </Form.Item>
        <Button htmlType="submit" className="lg:col-span-1 col-span-2">
          Search
        </Button>
      </Form>

      <>
        <Table
          columns={columns}
          dataSource={examSubmissions?.list}
          loading={examSubmissions?.loading}
        />
      </>
      <ConfirmModal
        open={openConfirm}
        onOk={handleChangeStatus}
        onCancel={handleCloseConfirm}
        title={`Are You Sure You Want To Edit ${confirmData?.record?.examineeUserName}`}
        description={
          confirmData?.keyId
            ? EXAM_SUBMISSIONS_STATUS_ACTIONS_TEXT[parseInt(confirmData?.keyId)]
                ?.text
            : ""
        }
      />
      <Modal
        title="Examinee Details"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <p className="flex items-center gap-3">
          <span className="font-bold">Examinee Name:</span>
          <span>{examineeDetails?.examineeFullName}</span>
        </p>
        <p className="flex items-center gap-3">
          <span className="font-bold">Examinee User Name:</span>
          <span>{examineeDetails?.examineeUserName}</span>
        </p>
      </Modal>
    </div>
  );
}

export default App;
