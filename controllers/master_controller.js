const db = require("../database/db");

module.exports.insertcatogrys = async (req, res) => {
  try {
    const { category_name, create_by } = req.body;
    console.log(req.body);
    const iscategoryexist = await db.query(
      "select *from heyplay_category where category_name=$1",
      [category_name]
    );

    if (iscategoryexist.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "alredy category name exist",
      });
    } else {
      const insertcatogry = await db.query(
        "insert into heyplay_category(category_name,create_by)values($1,$2)",
        [category_name, req.user_id]
      );

      if (insertcatogry.rowCount > 0) {
        res.status(200).send({
          success: true,
          message: "add successfully",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Somthing went Wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   success: false,
    //   message: `${error}`,
    // });
  }
};

module.exports.getcategory = async (req, res) => {
  try {
    const iscategoryName = await db.query(
      "select *from heyplay_category where active=$1",
      ["1"]
    );
    if (iscategoryName.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: iscategoryName.rows,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No data available",
        data: iscategoryName.rows,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: `${error}`,
    });
  }
};

module.exports.updatecategory = async (req, res) => {
  const { id, category_name, updated_by } = req.body;
  const updatecategory = await db.query(
    "Update heyplay_category SET category_name=$1,updated_by=$3 where id=$2",
    [category_name, id, req.user_id]
  );

  if (updatecategory.rowCount > 0) {
    res.status(200).send({
      success: true,
      message: "data update successfully",
    });
  } else {
    res.status(400).send({
      success: false,
      message: "data note exist",
    });
  }
};

module.exports.deletecategory = async (req, res) => {
  try {
    const { id, category_name, deleted_by, active } = req.body;
    const deletecategory = await db.query(
      "Update heyplay_category SET active=$1,deleted_by=$3 where id=$2",
      ["2", id, req.user_id]
    );
    if (deletecategory.rowCount > 0) {
      res.status(200).send({
        message: "delete",
      });
    } else {
      res.status(400).send({
        message: "somthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
