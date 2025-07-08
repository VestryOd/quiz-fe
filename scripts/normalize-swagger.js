const fs = require("fs/promises");
const path = require("path");
const http = require("http");

// Configuration
const SWAGGER_URL = "http://localhost:4001/swagger/swagger.json";
const OUTPUT_FILE_PATH = path.join(__dirname, "..", "swagger.local.json");

// Helper function to fetch the Swagger JSON
const fetchSwaggerJson = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(
            new Error(
              `Failed to fetch swagger.json: Status Code ${res.statusCode}`,
            ),
          );
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse swagger JSON: " + e.message));
          }
        });
      })
      .on("error", (err) => {
        reject(new Error("Failed to fetch swagger.json: " + err.message));
      });
  });
};

// --- FIX FUNCTIONS ---

// Fix 1: Recursively add non-nullable properties to the 'required' array.
function fixRequiredFields(node) {
  if (typeof node !== "object" || node === null) {
    return;
  }

  if (node.properties && typeof node.properties === "object") {
    const required = node.required || [];
    for (const key in node.properties) {
      const property = node.properties[key];
      // If property is not explicitly nullable, it should be required.
      if (property && property.nullable !== true && !required.includes(key)) {
        required.push(key);
      }
    }
    if (required.length > 0) {
      node.required = required;
    }
  }

  // Recurse through the object
  for (const key in node) {
    fixRequiredFields(node[key]);
  }
}

// Fix 2: Rename 'examples' to 'example' for Orval compatibility.
function fixExamples(node) {
  if (typeof node !== "object" || node === null) {
    return;
  }

  if (node.examples) {
    // Take the first example if multiple exist
    const firstExampleKey = Object.keys(node.examples)[0];
    if (firstExampleKey) {
      node.example = node.examples[firstExampleKey];
    }
    delete node.examples;
  }

  // Recurse through the object
  for (const key in node) {
    fixExamples(node[key]);
  }
}

// Fix 3: Remove 'nullable' property as it's handled by fix 1 and can cause issues.
function removeNullable(node) {
  if (typeof node !== "object" || node === null) {
    return;
  }
  if (node.hasOwnProperty("nullable")) {
    delete node.nullable;
  }
  for (const key in node) {
    removeNullable(node[key]);
  }
}

// Fix 4: Specific logical fix for a known parameter name mismatch.
function fixParameterMismatch(spec) {
  const path = "/api/v1/disciplines/{disciplineId}/practice";
  if (
    spec.paths &&
    spec.paths[path] &&
    spec.paths[path].post &&
    spec.paths[path].post.parameters
  ) {
    const params = spec.paths[path].post.parameters;
    const paramToFix = params.find((p) => p.name === "id");
    if (paramToFix) {
      console.log("Applying specific fix for parameter mismatch...");
      paramToFix.name = "disciplineId";
    }
  }
}

// --- MAIN EXECUTION ---

async function main() {
  try {
    console.log(`Fetching swagger spec from ${SWAGGER_URL}...`);
    const swaggerSpec = await fetchSwaggerJson(SWAGGER_URL);
    console.log("Successfully fetched swagger spec.");

    console.log("Applying fix 1: Ensuring 'required' fields are correct...");
    fixRequiredFields(swaggerSpec);

    console.log("Applying fix 2: Renaming 'examples' to 'example'...");
    fixExamples(swaggerSpec);

    console.log("Applying fix 3: Removing 'nullable' property...");
    removeNullable(swaggerSpec);

    console.log(
      "Applying fix 4: Correcting specific parameter name mismatch...",
    );
    fixParameterMismatch(swaggerSpec);

    console.log(`Writing normalized spec to ${OUTPUT_FILE_PATH}...`);
    await fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(swaggerSpec, null, 2));

    console.log("✅ Successfully normalized and saved swagger.local.json!");
  } catch (error) {
    console.error("❌ An error occurred during swagger normalization:");
    console.error(error);
    process.exit(1); // Exit with error code
  }
}

main();
