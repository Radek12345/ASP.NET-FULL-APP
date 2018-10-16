using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => 
                    new ContactResource 
                    { 
                        Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone 
                    }
                ))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => 
                    v.Features.Select(vf => vf.FeatureId)    
                ));

            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap(AddOrRemoveFeaturesFromVehicle);
        }

        private void AddOrRemoveFeaturesFromVehicle(VehicleResource vr, Vehicle v) {
            var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
            removedFeatures.ToList().ForEach(f => v.Features.Remove(f));

            var addedFeatures = vr.Features
                .Where(id => !v.Features.Any(f => f.FeatureId == id))
                .Select(id => new VehicleFeature { FeatureId = id });

            addedFeatures.ToList().ForEach(f => v.Features.Add(f));
        }
    }
}