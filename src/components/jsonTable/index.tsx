import React, { useState, ChangeEvent } from 'react';
import { areas } from '../../data/areas';
import { companies } from '../../data/companies';
import { companyArea } from '../../data/companyArea';
import { shipments } from '../../data/shipments';
import {
  areaProps,
  companiesProps,
  companyAreaProps,
  shipmentsProps
} from '../../types/jsonFile';
import { connect } from 'react-redux';
type JsonTableProps =
  | areaProps
  | companiesProps
  | companyAreaProps
  | shipmentsProps;

type Area = {
  areaSelect: {
    value: string;
    label: string;
  }[];
  countrySelect: {
    value: string;
    label: string;
  }[];
};

type DataItem = {
  companyId?: number;
  areaId?: number;
};

const JsonTable = ({ area }: { area: Area }) => {
  const [data, setData] = useState<JsonTableProps[]>(areas);
  const [selectedFile, setSelectedFile] = useState('Areas');

  const handleFileChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedFile(selected);

    switch (selected) {
      case 'Areas':
        setData(areas as areaProps[]);
        break;
      case 'Companies':
        setData(companies as companiesProps[]);
        break;
      case 'CompanyArea':
        setData(companyArea as companyAreaProps[]);
        break;
      case 'Shipments':
        setData(shipments as shipmentsProps[]);
        break;
      default:
        setData(areas);
    }
  };

  // transform data
  const areaFilter = area?.areaSelect?.map((item) => {
    const filter = areas?.filter((area) => area.state === item.value);
    return filter[0].areaId;
  });

  const matchedCompaniesUnflattened = area?.countrySelect?.map((item) => {
    const filter = companies?.filter(
      (company) => company.country === item.value
    );

    return filter.map((item) => item.companyId);
  });

  const matchedCompanies = matchedCompaniesUnflattened?.flat();

  const actualCompanies = matchedCompanies?.filter((element) => {
    const filter = companyArea.filter(
      (item) => item.companyId === element && areaFilter.includes(item.areaId)
    );
    if (filter.length > 0) {
      return true;
    }
    return false;
  });

  // Filter the data by our transformed data
  const filteredData = data.filter((item) => {
    let dataItem: DataItem = item as any;

    if (!actualCompanies || !areaFilter) return true;

    let shouldReturn = true;

    if (dataItem?.companyId && actualCompanies?.length > 0) {
      if (actualCompanies?.includes(dataItem?.companyId) == false) {
        shouldReturn = false;
      }
    }

    if (dataItem?.areaId && areaFilter?.length > 0) {
      if (areaFilter?.includes(dataItem?.areaId) == false) {
        shouldReturn = false;
      }
    }

    return shouldReturn;
  });

  const limitedData = filteredData;

  let results: {
    companyId: number;
    count: number;
  }[] = [];

  limitedData.forEach((item: DataItem) => {
    if (!item.companyId) return;

    if (results?.find((result) => result.companyId === item.companyId)) {
      const index = results.findIndex(
        (result) => result.companyId === item.companyId
      );
      results[index].count += 1;
    } else {
      results.push({ companyId: item.companyId, count: 1 });
    }
  });

  const sorted = results.sort((a, b) => b.count - a.count);

  if (!limitedData || limitedData.length === 0) {
    return <p className='flex justify-center m-6 font-bold '> No data </p>;
  }

  return (
    <div className="py-4">
      <select
        className=" my-2 text-gray-400 items-center outline-none cursor-default border border-1 rounded px-2 h-[38px] "
        onChange={handleFileChange}
      >
        <option value="Areas">Areas</option>
        <option value="Companies">Companies</option>
        <option value="CompanyArea">CompanyArea</option>
        <option value="Shipments">Shipments</option>
      </select>

      <p> {limitedData.length} results </p>

      {limitedData && (
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-white uppercase bg-gray-900">
              <tr>
                {Object?.keys(limitedData[0]).map((key, index) => (
                  <th className="px-6 py-3" key={index}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white text-black">
              {limitedData.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, index) => (
                    <td className="px-6 py-3 border " key={index}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedFile == 'Shipments' && (
        <div>
          {sorted.map((item) => {
            const company:
              | {
                  companyId: number;
                  name: string;
                  country: string;
                  lastLogin: string;
                }
              | undefined = companies.find(
              (company) => company.companyId === item.companyId
            );

            if (!company) return null;

            return (
              <div key={company?.companyId} className="flex flex-row space-x-2 justify-center m-6">
                <p> {company?.name} — </p>
                <p> {item.count} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: { area: Area }) => ({
  area: state.area
});

export default connect(mapStateToProps)(JsonTable);
