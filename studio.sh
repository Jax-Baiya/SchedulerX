#!/bin/bash

# 🎛️ Prisma CLI Manager for SchedulerX
# Run this from the project root
# Save as: prisma_cli.sh
# Make executable: chmod +x prisma_cli.sh

PIPELINE_DIR="backend/pipeline_v2"
PRISMA_DIR="$PIPELINE_DIR/prisma"
SCHEMA_PATH="schema.prisma"
ENV_FILE="../.env"

# Command history
HISTORY=()
HISTORY_INDEX=-1

# Move into the Prisma directory
cd "$(dirname "$0")/$PRISMA_DIR" || { echo "❌ Could not locate $PRISMA_DIR."; exit 1; }

# Check if .env exists
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env file not found at: $ENV_FILE"
  exit 1
fi

# Helper to run and track command history
run_command() {
  local cmd="$1"
  echo -e "\n⚙️  Running: $cmd\n"
  HISTORY+=("$cmd")
  HISTORY_INDEX=$(( ${#HISTORY[@]} - 1 ))
  eval "$cmd"
}

# Display interactive menu
show_menu() {
  echo -e "\n🧩 Prisma CLI Interface"
  echo "--------------------------------"
  echo "1. 🚀 Start Prisma Studio"
  echo "2. 📥 Pull schema from database (db pull)"
  echo "3. 📤 Push schema to database (db push)"
  echo "4. 🧱 Run DB migration (migrate dev)"
  echo "5. 🧨 Reset DB (migrate reset)"
  echo "6. 🌱 Seed database (db seed)"
  echo "7. ⚙️  Generate Prisma Client"
  echo "8. ✅ Validate schema"
  echo "9. 🎨 Format schema"
  echo "b. ⬅️  Back (previous command)"
  echo "r. 🔁 Repeat last command"
  echo "q. ❌ Quit"
  echo -n "Choose an option: "
}

# Start menu loop
while true; do
  show_menu
  read -r option

  case $option in
    1)
      echo "📦 Loading environment variables for Studio..."
      set -a
      source "$ENV_FILE"
      set +a
      run_command "npx prisma studio --schema=$SCHEMA_PATH"
      ;;
    2) run_command "npx prisma db pull --schema=$SCHEMA_PATH --env-file=$ENV_FILE" ;;
    3) run_command "npx prisma db push --schema=$SCHEMA_PATH --env-file=$ENV_FILE" ;;
    4)
      echo -n "Enter migration name: "
      read -r name
      run_command "npx prisma migrate dev --name $name --schema=$SCHEMA_PATH --env-file=$ENV_FILE"
      ;;
    5)
      echo -n "⚠️  This will wipe your database. Continue? (y/n): "
      read -r confirm
      if [[ "$confirm" == "y" ]]; then
        run_command "npx prisma migrate reset --schema=$SCHEMA_PATH --env-file=$ENV_FILE"
      else
        echo "❌ Cancelled."
      fi
      ;;
    6) run_command "npx prisma db seed --schema=$SCHEMA_PATH --env-file=$ENV_FILE" ;;
    7) run_command "npx prisma generate --schema=$SCHEMA_PATH" ;;
    8) run_command "npx prisma validate --schema=$SCHEMA_PATH" ;;
    9) run_command "npx prisma format --schema=$SCHEMA_PATH" ;;
    b)
      if (( HISTORY_INDEX > 0 )); then
        HISTORY_INDEX=$((HISTORY_INDEX - 1))
        echo "⬅️  Back to: ${HISTORY[$HISTORY_INDEX]}"
        eval "${HISTORY[$HISTORY_INDEX]}"
      else
        echo "⚠️  No previous command."
      fi
      ;;
    r)
      if (( HISTORY_INDEX >= 0 )); then
        echo "🔁 Re-running: ${HISTORY[$HISTORY_INDEX]}"
        eval "${HISTORY[$HISTORY_INDEX]}"
      else
        echo "⚠️  Nothing to repeat."
      fi
      ;;
    q) echo "👋 Exiting Prisma CLI."; exit 0 ;;
    *) echo "❌ Invalid option. Try again." ;;
  esac
done
