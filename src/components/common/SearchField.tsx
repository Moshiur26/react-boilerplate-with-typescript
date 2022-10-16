import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Table, Space, Pagination, Row, Col, Tooltip, Button } from "antd";
import { InputControl } from '@/components/common/FormControl';
import { useForm } from "react-hook-form";
import { ReloadOutlined } from '@ant-design/icons';

interface SearchFieldProps {
  getObjects: any;
  keyword: string|null
  setKeyword: any
  placeholderText?: string
}

interface FilterForm {
    keyword: string;
  }

const search: FC<SearchFieldProps> = ({
  getObjects,
  keyword,
  setKeyword,
  placeholderText
}) => {

    const { control, handleSubmit, setValue } = useForm<FilterForm>();

    const onSubmit = async (data: FilterForm) => {
        getObjects(data.keyword);
        setKeyword(data.keyword)
    };

    const onHandleResetFilter = () => {
        setKeyword("");
        setValue("keyword", "");
        getObjects(null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                <div className="  flex items-center">
                  <div className="w-80 mr-2">
                  <InputControl
                    control={control}
                    name="keyword"
                    placeholder={placeholderText || "Search by Title"}
                    className="!text-xs"
                  />
                  </div>

                  <Tooltip placement="bottom" title={"Reset"}>
                    <Button
                      className="btn btn-outline-primary  hover:text-white relative top-1 "
                      type="primary"
                      size="large"
                      htmlType="reset"
                      onClick={onHandleResetFilter}
                      icon={
                        <ReloadOutlined className="text-emerald-700 hover:text-white" />
                      }
                    />
                  </Tooltip>
                  <Button
                    className="btn btn-outline-primary relative top-1"
                    type="primary"
                    size="large"
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </div>
              </form>
    )
}

export default search;
