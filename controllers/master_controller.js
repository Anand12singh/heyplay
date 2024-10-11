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

//heyplay_class_formate_master

module.exports.insertclassformat = async (req, res) => {
  try {
    const { class_format, created_by } = req.body;
    const isclassformExist = await db.query(
      "select *from heyplay_class_formate_master where class_format=$1",
      [class_format]
    );
    if (isclassformExist.rowCount > 0) {
      res.status(200).send({
        success: false,
        messge: "alredy exist",
      });
    } else {
      const insertclassformat = await db.query(
        "insert into heyplay_class_formate_master(class_format,created_by)Values($1,$2)",
        [class_format, req.user_id]
      );

      if (insertclassformat.rowCount > 0) {
        res.status(200).send({
          success: true,
          messge: "class format add successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          messge: "Somthing Went Wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messge: "Internel Server Error",
    });
  }
};

module.exports.getclassformate = async (req, res) => {
  try {
    const getrecord = await db.query(
      "select id,class_format from heyplay_class_formate_master"
    );

    if (getrecord.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: getrecord.rows,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No Record Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: true,
      message: "Internel Server Error",
    });
  }
};

module.exports.updateclassformate = async (req, res) => {
  try {
    const { id, class_format, updated_by } = req.body;
    const updateclass = await db.query(
      "UPDATE heyplay_class_formate_master SET class_format=$2,updated_by=$3 where id=$1",
      [id, class_format, req.user_id]
    );

    if (updateclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "Update Successfully",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Data Not Exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteclassformate = async (req, res) => {
  try {
    const { id, class_format, deleted_by, active } = req.body;
    const deleteclass = await db.query(
      "UPDATE heyplay_class_formate_master SET deleted_by=$2,active=$3 where id=$1",
      [id, req.user_id, "2"]
    );

    if (deleteclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "Delete Successfully",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Data Not Exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//heyplay_age_master

module.exports.interage = async (req, res) => {
  try {
    const { from_age, to_age } = req.body;
    const insertage = await db.query(
      "insert into heyplay_age_master(from_age,to_age)Values($1,$2)",
      [from_age, to_age]
    );
    if (insertage.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "add Successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "somthing went Wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getage = async (req, res) => {
  try {
    const getrecord = await db.query("select * from heyplay_age_master");

    if (getrecord.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: getrecord.rows,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No Record Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: true,
      message: "Internel Server Error",
    });
  }
};

module.exports.updateage = async (req, res) => {
  try {
    const { id, from_age, to_age } = req.body;
    const updateclass = await db.query(
      "UPDATE heyplay_age_master SET from_age=$2,to_age=$3 where id=$1",
      [id, from_age, to_age]
    );

    if (updateclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "Update Successfully",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Data Not Exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteage = async (req, res) => {
  try {
    const { id, active } = req.body;

    // Use the `active` value from the request body instead of hardcoding "2"
    const updateclass = await db.query(
      "UPDATE heyplay_age_master SET active=$2 WHERE id=$1",
      [id, "2"]
    );

    if (updateclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Data Not Exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//heyplay_class_mode
module.exports.inseryclassmode = async (req, res) => {
  try {
    const { id, class_mode, create_by } = req.body;

    const isclassmodeExist = await db.query(
      "select *from heyplay_class_mode where class_mode=$1",
      [class_mode]
    );

    if (isclassmodeExist.rowCount > 0) {
      res.status(200).send({
        success: false,
        message: "class mode alredy exist",
      });
    } else {
      const insertclass_mode = await db.query(
        "insert into heyplay_class_mode(class_mode,created_by)Values($1,$2)",
        [class_mode, req.user_id]
      );

      if (insertclass_mode.rowCount > 0) {
        res.status(200).send({
          success: true,
          message: "Class mode add successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Somthing Went Wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getclassmode = async (req, res) => {
  try {
    const getclassmode = await db.query("select *from heyplay_class_mode");
    if (getclassmode.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: getclassmode.rows,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No Record Found",
        data: getclassmode.rows,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateclassmode = async (req, res) => {
  const { id, class_mode, updated_by } = req.body;

  const updateclassmode = await db.query(
    "Update heyplay_class_mode SET class_mode=$1,updated_by=$2 Where id=$3",
    [class_mode, req.user_id, id]
  );
  if (updateclassmode.rowCount > 0) {
    res.status(200).send({
      success: true,
      message: "update Successfully",
    });
  } else {
    res.status(200).send({
      success: false,
      message: "no record found",
    });
  }
};

module.exports.deleteclassmode = async (req, res) => {
  try {
    const { id, class_mode } = req.body;

    const deleteData = await db.query(
      "Delete From heyplay_class_mode where id=$1",
      [id]
    );

    if (deleteData.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "dele successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "somthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//heyplay_user_master
module.exports.inseryuser_master = async (req, res) => {
  try {
    const { id, user_master, create_by } = req.body;

    const isclassmodeExist = await db.query(
      "select *from heyplay_user_master where user_master=$1",
      [user_master]
    );

    if (isclassmodeExist.rowCount > 0) {
      res.status(200).send({
        success: false,
        message: "User Master alredy exist",
      });
    } else {
      const insertuser_master = await db.query(
        "insert into heyplay_user_master(user_master,created_by)Values($1,$2)",
        [user_master, req.user_id]
      );

      if (insertuser_master.rowCount > 0) {
        res.status(200).send({
          success: true,
          message: "User Master add successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Somthing Went Wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getuser_master = async (req, res) => {
  try {
    const getuser_master = await db.query("select *from heyplay_user_master");
    if (getuser_master.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: getuser_master.rows,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No Record Found",
        data: getuser_master.rows,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateuser_master = async (req, res) => {
  const { id, user_master, updated_by } = req.body;

  const updateuser_master = await db.query(
    "Update heyplay_user_master SET user_master=$1,updated_by=$2 Where id=$3",
    [user_master, req.user_id, id]
  );
  if (updateuser_master.rowCount > 0) {
    res.status(200).send({
      success: true,
      message: "update Successfully",
    });
  } else {
    res.status(200).send({
      success: false,
      message: "no record found",
    });
  }
};

module.exports.deleteuser_master = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteData = await db.query(
      "Delete From heyplay_user_master where id=$1",
      [id]
    );

    if (deleteData.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "dele successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "somthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//heyplay_occurrence
module.exports.inseryoccurrences = async (req, res) => {
  try {
    const { id, occurrences, create_by } = req.body;

    const isclassmodeExist = await db.query(
      "select *from heyplay_occurrence where occurrences=$1",
      [occurrences]
    );

    if (isclassmodeExist.rowCount > 0) {
      res.status(200).send({
        success: false,
        message: "occurrences  alredy exist",
      });
    } else {
      const insertoccurrences = await db.query(
        "insert into heyplay_occurrence(occurrences,created_by)Values($1,$2)",
        [occurrences, req.user_id]
      );

      if (insertoccurrences.rowCount > 0) {
        res.status(200).send({
          success: true,
          message: "occurrences add successfully",
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Somthing Went Wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getoccurrences = async (req, res) => {
  try {
    const getoccurrences = await db.query("select *from heyplay_occurrence");
    if (getoccurrences.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "data get successfully",
        data: getoccurrences.rows,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No Record Found",
        data: getoccurrences.rows,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateoccurrences = async (req, res) => {
  const { id, occurrences, updated_by } = req.body;

  const updateoccurrences = await db.query(
    "Update heyplay_occurrence SET occurrences=$1,updated_by=$2 Where id=$3",
    [occurrences, req.user_id, id]
  );
  if (updateoccurrences.rowCount > 0) {
    res.status(200).send({
      success: true,
      message: "update Successfully",
    });
  } else {
    res.status(200).send({
      success: false,
      message: "no record found",
    });
  }
};

module.exports.deleteoccurrences = async (req, res) => {
  try {
    const { id } = req.body;

    const deleteData = await db.query(
      "Delete From heyplay_occurrence where id=$1",
      [id]
    );

    if (deleteData.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "dele successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "somthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//heyplay_add_class

module.exports.addclass = async (req, res) => {
  try {
    const {
      class_name,
      class_description,
      class_category,
      class_formate,
      class_mode,
      created_by,
      additinal_information,
      image_1,
      image_2,
      image_3,
      image_4,
      image_5,
    } = req.body;

    const addclass = await db.query(
      "insert into heyplay_add_class(class_name,class_description,class_category,class_formate,class_mode,created_by,additinal_information,image_1,image_2,image_3,image_4,image_5)Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        class_name,
        class_description,
        class_category,
        class_formate,
        class_mode,
        req.user_id,
        additinal_information,
      ]
    );
    if (addclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "class add successfully",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "somthing went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getclass = async (req, res) => {
  try {
    const getclass = await db.query("select *from heyplay_add_class");
    if (getclass.rowCount > 0) {
      res.status(200).send({
        success: true,
        message: "get record successfully",
        data: getclass.rows,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "No Record",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: true,
      message: "server not response",
    });
    console.log(error);
  }
};
