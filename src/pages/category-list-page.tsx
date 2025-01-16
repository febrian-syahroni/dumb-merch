import api from "@/axios";
import { useEffect, useState } from "react";

export default function CategoryListPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        setError("Failed to fetch categories:");
        setCategories([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            {categories.map(item => (
              <tr key={item.id} className=" odd:bg-[#232323]">
                <td className="p-2 border-b text-left">{categories.indexOf(item) + 1}</td>
                <td className="p-2 border-b text-left">{item.name}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
