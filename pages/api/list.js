// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ARRAY_LEN = 1000;
let arrIndex = [];
for (let i = 0; i < ARRAY_LEN; i++) arrIndex.push(i);

const mockList = Array.from(
  arrIndex,
  x => ({ id: x, name: `luffyZh${x}`, age: Math.ceil(Math.random() * 100) })
);

function generateResList(page = 1) {
  return mockList.slice((10 * (page - 1)), (10 * page));
}

export default (req, res) => {
  const { page } = req.query;
  const list = generateResList(page);
  res.status(200).json({
    success: true,
    message: '',
    data: {
      list,
      total: list.length
    }
  })
}
