import { useEffect } from "react";
import { Badge, Form, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import StatusTag from "@components/status-tag/StatusTag";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@components/button/Button";
import Table from "@components/table/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@appTypes/generalTypes";
import {
  getAreas,
  getAssessmentsStatus,
  getCourses,
  getPrograms,
} from "@store/lookupSlice";
import { getAssessments, syncSubmission } from "@store/assessments";
import { AppDispatch } from "@store";
import {
  AssessmentData,
  AssessmentsFormFilters,
} from "@pages/download-assessment/DownloadAssessmentTypes";

function App() {
  const [form] = Form.useForm();

  const { lookups, assessments } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // get lookups to filter data
    dispatch(getAssessmentsStatus());
    dispatch(getAreas());
    dispatch(getPrograms());

    // get assessments list
    dispatch(getAssessments());
  }, []);

  const onFinish = (values: AssessmentsFormFilters) => {
    dispatch(getAssessments(values));
  };
  // add reset button
  // const onReset = () => {
  //   form.resetFields();
  // };

  const handleSyncClick = (row: AssessmentData) => {
    dispatch(syncSubmission(row.id));
  };
  const columns: ColumnsType = [
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) => a.area.localeCompare(b.area),
    },

    {
      title: "Assessment Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.area.localeCompare(b.area),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),

      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.area.localeCompare(b.area),
      render: (text) => <StatusTag status={text} />,
    },
    {
      title: "Mentor Examinees",
      dataIndex: "mentorsCount",
      key: "mentorsCount",
      sorter: (a, b) => a.mentorsCount - b.mentorsCount,

      render: (text, row) => (
        <Link to={`/track-exam/${row?.trackedExamId}`}>
          <Badge count={text}>
            <UserOutlined className="mx-3" />
          </Badge>
        </Link>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, row) => (
        <Button
          icon={<SyncOutlined />}
          onClick={() => handleSyncClick(row as AssessmentData)}
          loading={
            assessments?.syncSubmission?.syncing &&
            assessments?.syncSubmission?.id === row?.id
          }
          loaderColor={"white"}
          className="min-w-[5rem]"
        >
          Sync Submission
        </Button>
      ),
    },
  ];
  const handleProgramChange = (value: number) => {
    dispatch(getCourses(value));
  };

  return (
    <>
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
            options={lookups.areas}
          />
        </Form.Item>

        <Form.Item name="programId">
          <Select
            allowClear
            showSearch
            placeholder="Program"
            onChange={handleProgramChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.programs}
          />
        </Form.Item>

        <Form.Item name="courseId">
          <Select
            allowClear
            showSearch
            placeholder="Course"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.courses}
            notFoundContent={
              !form?.getFieldValue("programId")
                ? "Select Program First"
                : "No Courses Found"
            }
          />
        </Form.Item>
        <Form.Item name="statusId">
          <Select
            allowClear
            showSearch
            placeholder="Assessment Status"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={lookups.assessmentStatus}
          />
        </Form.Item>
        <Button htmlType="submit" className="lg:col-span-1 col-span-2">
          Search
        </Button>
      </Form>

      <>
        <Table
          columns={columns}
          dataSource={assessments?.list}
          loading={assessments?.loading}
        />
      </>
    </>
  );
}

export default App;
