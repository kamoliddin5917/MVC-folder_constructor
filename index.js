const path = require("path");
const { IO } = require("./io");
const io = new IO();

const MVS = ([, , type, name]) => {
  if (type === "mvc-express") {
    //   FOLDERS
    io.createFolder(path.join(__dirname, `../${name}`));
    io.createFolder(path.join(__dirname, `../${name}`, "server"));
    io.createFolder(path.join(__dirname, `../${name}`, "server", "model"));
    io.createFolder(path.join(__dirname, `../${name}`, "server", "src"));
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "config")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "modules")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "modules", "register")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "modules", "login")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "middlewares")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "routers")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "uploads")
    );
    io.createFolder(
      path.join(__dirname, `../${name}`, "server", "src", "utils")
    );

    // FILES
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "model", "created.sql"),
      " "
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "model", "insert.sql"),
      " "
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "model", "key.sql"),
      " "
    );

    //   FILES AND CODES
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "src", "server.js"),
      'const express = require("express");\nconst cors = require("cors");\nconst { PORT } = require("./config/server");\n\nconst app = express();\n\napp.use(cors());\napp.use(express.json());\napp.use("/", require("./routers/routers"));\n\napp.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));\n'
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", ".env"),
      "PORT=777\nJWT_KEY=faqat-oldinga\nDB_KEY=postgres-password"
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", ".gitignore"),
      "node_modules/\n.env"
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "config",
        "server.js"
      ),
      'require("dotenv").config();\nmodule.exports = {\n  PORT: process.env.PORT,\n  JWT_KEY: process.env.JWT_KEY,\n}; \n'
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "src", "config", "pool.js"),
      'require("dotenv").config();\nmodule.exports = {\n  connectionString: `postgres://postgres:${process.env.DB_KEY}@localhost:5432/databaseName`,\n};\n'
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "src", "utils", "jwt.js"),
      'const jwt = require("jsonwebtoken");\nconst { JWT_KEY } = require("../config/server");\n\nmodule.exports = {\n  sign: (data) => jwt.sign(data, JWT_KEY),\n  verify: (data) => jwt.verify(data, JWT_KEY),\n};\n'
    );
    io.writeFile(
      path.join(__dirname, `../${name}`, "server", "src", "utils", "pg.js"),
      'const PG = require("../config/pool");\nconst { Pool } = require("pg");\n\nconst pool = new Pool({ connectionString: PG.connectionString });\n\nconst fetch = async (SQL, params) => {\n  const client = await pool.connect();\n  try {\n    const {\n    rows: [row],\n    } = await client.query(SQL, params);\n    return row;\n  } finally {\n    client.release();\n  }\n};\n\n const fetchAll = async (SQL, params) => {\n  const client = await pool.connect();\n  try {\n    const { rows } = await client.query(SQL, params);\n    return rows;\n  } finally {\n    client.release();\n  }\n};\n\nmodule.exports = {\n  fetch,\n  fetchAll,\n};\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "routers",
        "routers.js"
      ),
      'const { Router } = require("express");\n\nconst router = Router();\n\nconst register = require("../modules/register/router");\nconst login = require("../modules/login/router");\n\nrouter.use("/api", register);\nrouter.use("/api", login);\n\nmodule.exports = router;\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "register",
        "register.js"
      ),
      'const model = require("./model");\nconst { sign } = require("../../utils/jwt");\n\nmodule.exports = {\n  POST: async (req, res) => {\n    try {\n    } catch (error) {\n      res.status(500).json({ message: "Server ERROR!" });\n    }\n  },\n};\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "register",
        "model.js"
      ),
      'const { fetch } = require("../../utils/pg");\n\nconst CREATED_USER =""\n\nconst createdUser = (...values) => fetch(CREATED_USER, values);\n\nmodule.exports = { createdUser };\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "register",
        "router.js"
      ),
      'const { Router } = require("express");\n\nconst router = Router();\n\nconst controller = require("./register");\n\nrouter.post("/register", controller.POST);\n\nmodule.exports = router;\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "login",
        "login.js"
      ),
      'const model = require("./model");\nconst { sign } = require("../../utils/jwt");\n\nmodule.exports = {\n  POST: async (req, res) => {\n    try {\n    } catch (error) {\n      res.status(500).json({ message: "Server ERROR!" });\n    }\n  },\n};\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "login",
        "model.js"
      ),
      'const { fetch } = require("../../utils/pg");\n\nconst FIND_USER =""\n\nconst findUser = (...values) => fetch(FIND_USER, values);\n\nmodule.exports = { findUser };\n'
    );
    io.writeFile(
      path.join(
        __dirname,
        `../${name}`,
        "server",
        "src",
        "modules",
        "login",
        "router.js"
      ),
      'const { Router } = require("express");\n\nconst router = Router();\n\nconst controller = require("./login");\n\nrouter.post("/login", controller.POST);\n\nmodule.exports = router;\n'
    );
  }
  console.log(type);
};
MVS(process.argv);
