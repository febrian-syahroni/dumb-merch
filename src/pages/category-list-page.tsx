export default function CategoryListPage() {
  return (
    <div>

      <h1 className="mb-[27px] text-xl font-bold">List Category</h1>

      {/* Table */}
      <div className="text-base bg-[#303030]">
        <table className="table-fixed w-full border-b">
          <thead className="">
            <tr className="h-[50px]">
              <th className="font-bold p-2 border-b text-left bg-[#303030] text-white">
                No
              </th>
              <th className="font-bold p-2 border-b text-left bg-[#303030] text-white">
                Category Name
              </th>
              <th className="font-bold px-4 border-b text-left bg-[#303030] text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" odd:bg-[#232323]">
              <td className="p-2 border-b text-left">1</td>
              <td className="p-2 border-b text-left">Mouse</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className=" odd:bg-[#232323]">
              <td className="p-2 border-b text-left">2</td>
              <td className="p-2 border-b text-left">Keyboard</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className=" odd:bg-[#232323]">
              <td className="p-2 border-b text-left">3</td>
              <td className="p-2 border-b text-left">bag</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className="odd:bg-[#232323]">
              <td className="p-2 border-b text-left">4</td>
              <td className="p-2 border-b text-left">Monitor</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className=" odd:bg-[#232323]">
              <td className="p-2 border-b text-left">5</td>
              <td className="p-2 border-b text-left">Doll</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className=" odd:bg-[#232323]">
              <td className="p-2 border-b text-left">6</td>
              <td className="p-2 border-b text-left">Pillow</td>
              <td className="py-2 px-4 border-b text-left">
                <div className="flex h-[30px] gap-[15px]">
                  <button className="rounded-[5px] w-[100px] bg-[#56C05A]">
                    Edit
                  </button>
                  <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
