using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleEager(int id);
        Task<Vehicle> GetVehicleLazy(int id);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<IEnumerable<Vehicle>> GetVehicles(Filter filter);
    }
}