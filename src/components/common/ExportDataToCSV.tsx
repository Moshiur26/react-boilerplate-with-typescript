import { FC, useState, useRef, useEffect} from "react";
import {FaFileExport} from 'react-icons/fa'
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { getData } from '@/lib/services/baseServices';

interface ExportDataToCSVProps {
  name: string;
  dataUrl: string;
  headers: any;
  title: string;
  loadData: (item: any) => void;
  defaultValue?: any[];
}
const ExportDataToCSV: FC<ExportDataToCSVProps> = ({name, title, dataUrl, headers, loadData, defaultValue }) => {
  const [data, setData] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const csvLinkRef = useRef<any>(null);
  const isFirstTime = useRef(true);


  useEffect(() => {
    // avoiding first time render processing
    if(isFirstTime.current) {
      isFirstTime.current = false;
      return;
    }
  
    csvLinkRef.current.link.click();
    setIsExporting(false);
    toast.success(`${title} has been exported successfully`);
  } , [data])

  // Generating data for CSV
  const generateFormattedData = (data:any) => {
    if (data) {
			return data?.map((item:any, i:number) => {
				return loadData(item);
			});
		} else {
			return [];
		}
  }

  // Fetching all data
  const getAllData = () => {
		setIsExporting(true);
		return getData(dataUrl)
			.then((res) => res.data)
			.catch((errMsg) => {
				toast.error("Failed to export");
				return [];
			});
	};


  const downloadReport = async () => {
		const data = await getAllData();
		const fData = generateFormattedData(data);
		if(fData.length > 0) {
      setData(fData);
		} else {
			setIsExporting(false);
			toast.error("Nothing to export");
		}
	};

  const printReport = async () => {
    const fData = generateFormattedData(defaultValue);
    if(fData.length > 0) {
      setData(fData);
		} else {
			setIsExporting(false);
			toast.error("Nothing to export");
		}
  }

  return (
    <div>
      <button
        className="btn btn-outline-warning hover:text-white text-sm"
        onClick={()=> defaultValue? printReport() : downloadReport()}
        disabled={isExporting}
      >
       <FaFileExport className='inline-block mr-0.5 relative bottom-0.5 text-xs'/>
       {isExporting? "Exporting..." : `Export ${title}`}
      </button>
      <CSVLink
        className="hidden"
        filename={name}
        data={data}
        headers={headers}
        ref={csvLinkRef}
      />
    </div>
  );
};

export default ExportDataToCSV;
