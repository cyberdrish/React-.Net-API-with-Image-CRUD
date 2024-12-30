using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeRegisterAPI.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string EmployeeName { get; set; }

        [Column(TypeName = "nvarchar(50)")]

        public string Occupation { get; set; }

        [Column(TypeName = "nvarchar(100)")]

        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        //Pascal case(EmployeeName) -> Camel case(employeeName)
        //camel case(employeeName) -> Pascal case
        [NotMapped]
        public string? ImageSrc { get; set; }
    }
}
