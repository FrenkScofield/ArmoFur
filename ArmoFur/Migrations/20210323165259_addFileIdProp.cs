using Microsoft.EntityFrameworkCore.Migrations;

namespace ArmoFur.Migrations
{
    public partial class addFileIdProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "Abouts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Abouts_FileId",
                table: "Abouts",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Abouts_Files_FileId",
                table: "Abouts",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Abouts_Files_FileId",
                table: "Abouts");

            migrationBuilder.DropIndex(
                name: "IX_Abouts_FileId",
                table: "Abouts");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "Abouts");
        }
    }
}
